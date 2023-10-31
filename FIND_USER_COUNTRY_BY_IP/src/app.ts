import express, { NextFunction, Request, Response } from "express";

import {countryController} from "./controllers";
import {locationMiddleware} from "./middlewares";

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 5001;

app.post('/location', locationMiddleware.getIpUser, countryController.userLocation);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err?.status || 500;
    return res.status(status).json({
        message: err.message,
        status,
    });
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});







