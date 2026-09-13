import { create } from "axios";
import { ApiErrorResponse } from "../types/api-response";
import { TermiiConfig } from "../types/config";
import { SendSmsBody, SmsResponse } from "../types/messaging";
import { useTryCatch } from "./hooks";

export const TermiiSdk = async (config: TermiiConfig) => {
    const trycatch = useTryCatch();
    const req = create({
        baseURL: config.base_url,
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    const handles = {
        sms: {
            send: async (body: SendSmsBody) => {
                return await trycatch.wrap<SmsResponse | ApiErrorResponse>(async () => {
                    const resp = await req.post(`/api/sms/send`, {api_key: config.api_key, ...body});
                    return resp?.data;
                }, (error) => {
                    return error?.response?.data;
                });
            },
        },
    };

    return {...handles};
};