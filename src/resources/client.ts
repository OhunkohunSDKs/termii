import { create } from "axios";
import { ApiErrorResponse } from "../types/api-response.js";
import { TermiiConfig } from "../types/config.js";
import { SendEmailTemplateBody, SendEmailTemplateResponse } from "../types/email.js";
import { ListSenderIdParams, ListSenderIdResponse, RequestSenderIdBody, RequestSenderIdResponse } from "../types/sender-id.js";
import { BulkSmsBody, SendSmsBody, SmsResponse } from "../types/sms.js";
import { SendWhatsAppTemplateBody, SendWhatsAppTemplateResponse } from "../types/whatsapp.js";
import { useAxiosError, useTryCatch } from "./hooks.js";

export const Termii = (config: TermiiConfig) => {
    const trycatch = useTryCatch(config.debug === 'error');
    const axiosError = useAxiosError();
    const req = create({
        baseURL: config.base_url,
        headers: {
            "Content-Type": "application/json",
        },
    });

    type ApiResult<T extends Record<string, any>> =
    | { success: T; failure?: never }
    | { success?: never; failure: ApiErrorResponse };

    const callApi = async <T extends Record<string, any>> (method: 'post' | 'get', urlPath: string, data: Record<string, any> | undefined) => {
        const resp = await trycatch.wrap<ApiResult<T>>(async () => {
            const resp = await (
                method === 'post' ? req.post(urlPath, {api_key: config.api_key, ...data}) :
                req.get(urlPath, {params: {api_key: config.api_key, ...data}})
            );
            return {success: resp?.data ?? {}};
        }, (error) => {
            let resp: ApiResult<T> | undefined;
            if(error?.response?.data) resp = {failure: error?.response?.data};
            else resp = {failure: axiosError.rephrase(error)}; //output default failure response; in case of client error, and request couldn't reach the endpoint;
            return resp;
        });

        return resp ?? {failure: {error: `SDK::API_REQUEST_FAILED`, message: `API request could not be completed`, status: 500}};
    };
    
    const handles = {
        sender_id: {
            list: async (query?: ListSenderIdParams) => await callApi<ListSenderIdResponse>('get', `/api/sender-id`, query),
            request: async (body: RequestSenderIdBody) => await callApi<RequestSenderIdResponse>('post', `/api/sender-id/request`, body),
        },
        sms: {
            send: async (body: SendSmsBody) => await callApi<SmsResponse>('post', `/api/sms/send`, body),
            send_bulk: async (body: BulkSmsBody) => await callApi<SmsResponse>('post', `/api/sms/send/bulk`, body),
        },
        email_template: {
            send: async (body: SendEmailTemplateBody) => await callApi<SendEmailTemplateResponse>('post', `/api/templates/send-email`, body),
        },
        whatsapp_template: {
            send: async (body: SendWhatsAppTemplateBody) => await callApi<SendWhatsAppTemplateResponse>('post', `/api/send/template${Object.keys(body.media || {}).length ? `/media` : ``}`, body),
        },
    };

    return {...handles};
};