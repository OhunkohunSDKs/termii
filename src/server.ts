import dotenv from 'dotenv';
import express from 'express';
import { TermiiSdk } from './resources/services';
import { TermiiConfig } from './types/config';

dotenv.config();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

app.get('/', async (req, res) => {
    let output;
    
    output = {message: `Server running...`};

    //sdk usage;

    //configure sdk;
    const config: TermiiConfig = {
        api_key: process.env.API_KEY!,
        base_url: process.env.BASE_URL!,
    };
    const sdk = await TermiiSdk(config);

    //example: send sms;
    output = await sdk.sms.send({
        type: 'plain',
        channel: 'dnd',
        from: process.env.SEND_SMS_FROM!,
        to: process.env.SEND_SMS_TO!,
        sms: `Hello, just testing sdk`,
    });

    res.status(200).json(output);
});

//start local server
if(process.env.IS_LOCAL_MACHINE === 'true'){
    const port = 4000;
    app.listen(port, () => {
        console.log(`[http] listening on port ${port}`);
    });
}

export default app;