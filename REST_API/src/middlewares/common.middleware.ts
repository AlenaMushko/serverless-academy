import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import {ApiError} from "../errors";

class CommonMiddleware {
    public isBodyValid(validator: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const {error, value} = validator.validate(req.body);

                if (error) {
                    const errorMessage = error.message;
                    throw new ApiError(errorMessage, 409);
                }

                req.body = value;
                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();
