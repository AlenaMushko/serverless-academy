"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonMiddleware = void 0;
const errors_1 = require("../errors");
class JsonMiddleware {
    async isJsonValid(ctx, next) {
        try {
            const { file } = ctx.request.files;
            if (!file) {
                throw new errors_1.ApiError("File was not uploaded", 401);
            }
            const files = Array.isArray(file) ? file : [file];
            files.forEach((file) => {
                const { mimetype, size } = file;
                if (mimetype !== 'application/json') {
                    throw new errors_1.ApiError('File has invalid format', 400);
                }
                if (size > 2 * 1024 * 1024) {
                    throw new errors_1.ApiError("File is too big", 400);
                }
            });
            await next();
        }
        catch (err) {
            throw new errors_1.ApiError(err.message, err.status);
        }
    }
}
exports.jsonMiddleware = new JsonMiddleware();
