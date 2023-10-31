import { NextFunction, Request, Response } from "express";
import {ApiError} from "../errors";

class LocationMiddleware {
    public async getIpUser (req: Request, res: Response, next: NextFunction) {
        try {
            let ipAddress: string | undefined;
            const forwardedFor = req.headers['x-forwarded-for'];

            if (typeof forwardedFor === 'string') {
                ipAddress = forwardedFor.split(',')[0];
            } else {
                ipAddress = req.socket?.remoteAddress;
            }

            res.locals.ipAddress = ipAddress;
            next();
        } catch (err) {
            throw new ApiError("Server Error", 500)
        }
    }

}

export const locationMiddleware = new LocationMiddleware();
