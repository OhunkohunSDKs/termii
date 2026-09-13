import { Express } from 'express';

export const startLocalServer = async (app: Express) => {
    const port = 4000;
    app.listen(port, () => {
        console.log(`[http] listening on port ${port}`);
    });
};