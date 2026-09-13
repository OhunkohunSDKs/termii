import { Termii, TermiiConfig } from "../src";

export const messagingExamples = {
    sendSms: async () => {
        let output;
        
        //usage;
    
        //configure;
        const config: TermiiConfig = {
            api_key: process.env.API_KEY!,
            base_url: process.env.BASE_URL!,
        };
        const client = Termii(config);
    
        //example: send sms;
        output = await client.sms.send({
            type: 'plain',
            channel: 'dnd',
            from: process.env.SEND_SMS_FROM!,
            to: process.env.SEND_SMS_TO!,
            sms: `Hello, just testing sdk`,
        });

        if(output?.success){
            //the response from successful endpoint call;
        }
        else {
            //the response from failed endpoint call;
        }

        return output;
    },
};