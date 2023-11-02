import { Context, Next } from "koa";
import { ApiError } from "../errors";

class JsonMiddleware {
    public async isJsonValid(ctx: Context, next: Next) {
        try {
            const {file} = ctx.request.files;
            if (!file) {
                throw new ApiError("File was not uploaded", 401);
            }

            const files = Array.isArray(file) ? file : [file];

            files.forEach((file)=>{
                const { mimetype, size } = file;

                if (mimetype !== 'application/json') {
                    throw new ApiError('File has invalid format', 400);
                }
                if (size > 2 * 1024 * 1024) {
                    throw new ApiError("File is too big", 400);
                }
            })

            await next();
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }
}

export const jsonMiddleware = new JsonMiddleware();
