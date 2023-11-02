"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonController = void 0;
const services_1 = require("../services");
const errors_1 = require("../errors");
class JsonController {
    async getJson(ctx) {
    }
    ;
    async putJson(ctx) {
        try {
            const user = ctx.state.user[0];
            const { file } = ctx.request.files;
            await services_1.jsonService.putJson(user.id, file);
            ctx.status = 200;
            ctx.body = 'The file has been saved';
        }
        catch (err) {
            throw new errors_1.ApiError(err.message, err.status);
        }
    }
    ;
}
exports.jsonController = new JsonController();
