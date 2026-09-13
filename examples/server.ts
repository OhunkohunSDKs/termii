import dotenv from 'dotenv';
import express from 'express';
import { examples } from '.';

dotenv.config();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

app.get('/', async (req, res) => {
    let output;
    
    output = {message: `Server running...`};

    //run an example;
    output = await examples.messaging.sendSms();

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