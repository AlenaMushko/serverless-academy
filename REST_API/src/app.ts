import express, { NextFunction, Request, Response } from "express";

import {configs, checkAndCreateTable} from "./config";
import {authRouter} from "./routers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = configs.PORT;

app.use('/auth', authRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err?.status || 500;
    return res.status(status).json({
        message: err.message,
        status,
    });
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await checkAndCreateTable();
    } catch (error) {
        console.error("Error initializing the DB", error);
    }
});







