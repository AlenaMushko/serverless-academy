import { Context, Next } from "koa";
import { ApiError } from "../errors";

class JsonMiddleware {
    public async isJsonValid(ctx: Context, next: Next) {
        try {
            const fileJson = ctx.request.files?.fileJson;
            if (!fileJson) {
                throw new ApiError("File was not uploaded", 401);
            }

            const file = Array.isArray(fileJson) ? fileJson[0] : fileJson;
            if (Array.isArray(fileJson)) {
                throw new ApiError("Multiple file upload is not allowed", 400);
            }


            const { mimetype, size } = file;
            if (mimetype !== 'application/json') {
                throw new ApiError('File has invalid format', 400);
            }
            if (size > 2 * 1024 * 1024) {
                throw new ApiError("File is too big", 400);
            }

            await next();
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }
}

export const jsonMiddleware = new JsonMiddleware();
