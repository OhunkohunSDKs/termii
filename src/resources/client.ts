import { create } from "axios";
import { ApiErrorResponse } from "../types/api-response.js";
import { TermiiConfig } from "../types/config.js";
import { SendEmailTemplateBody, SendEmailTemplateResponse } from "../types/email.js";
import { ListSenderIdParams, ListSenderIdResponse, RequestSenderIdBody, RequestSenderIdResponse } from "../types/sender-id.js";
import { BulkSmsBody, SendSmsBody, SmsResponse } from "../types/sms.js";
import { SendWhatsAppTemplateBody } from "../types/whatsapp.js";
import { useTryCatch } from "./hooks.js";

export const Termii = (config: TermiiConfig) => {
    const trycatch = useTryCatch(config.debug === 'error');
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
            else {//output default failure response; in case of client error, and request couldn't reach the endpoint;
                const errorStatusMap: Record<string, number> = {
                    // Network / connection
                    ERR_NETWORK: 503,
                    ENOTFOUND: 503,
                    ECONNREFUSED: 503,
                    ECONNRESET: 503,
                    EHOSTUNREACH: 503,
                    ENETUNREACH: 503,

                    // Timeout
                    ECONNABORTED: 504,
                    ETIMEDOUT: 504,

                    // TLS / certificate
                    SELF_SIGNED_CERT_IN_CHAIN: 502,
                    DEPTH_ZERO_SELF_SIGNED_CERT: 502,
                    UNABLE_TO_VERIFY_LEAF_SIGNATURE: 502,
                    CERT_HAS_EXPIRED: 502,
                    ERR_TLS_CERT_ALTNAME_INVALID: 502,

                    // Request / configuration
                    ERR_INVALID_URL: 400,
                    ERR_BAD_OPTION: 400,
                    ERR_BAD_OPTION_VALUE: 400,

                    // Axios cancellation
                    ERR_CANCELED: 499,
                };
                const statusCode = error?.code ? errorStatusMap[error.code] : 500;
                resp = {failure: {error: `SDK::${error?.code || 'API_REQUEST_FAILED'}`, message: `${error?.message || `API request could not be completed`}`, status: statusCode}};
            }

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
            send: async (body: SendWhatsAppTemplateBody) => await callApi<RequestSenderIdResponse>('post', `/api/send/template${Object.keys(body.media || {}).length ? `/media` : ``}`, body),
        },
    };

    return {...handles};
};