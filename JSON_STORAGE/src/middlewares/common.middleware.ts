import { ObjectSchema } from "joi";
import { Context, Next } from "koa";

import {ApiError} from "../errors";

class CommonMiddleware {
    public isBodyValid(validator: ObjectSchema) {
        return async (ctx: Context, next: Next) => {
            try {
                const {error, value} = validator.validate(ctx.request.body);

                if (error) {
                    throw new ApiError(error.message, 409);
                }

                ctx.request.body = value;
              await  next();
            } catch (err) {
                ctx.throw(err.status, err.message);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();
