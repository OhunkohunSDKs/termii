import dotenv from 'dotenv';
import express from 'express';
import { startLocalServer } from './resources/local-server';

dotenv.config();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());

app.get('/', async (req, res) => {
    const output = {
        message: `Server running...`,
    };

    res.status(200).json(output);
});

if(process.env.IS_LOCAL_MACHINE === 'true') startLocalServer(app);

export default app;