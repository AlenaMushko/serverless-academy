import {Context} from "koa";
import {jsonService} from "../services";
import {ApiError} from "../errors";

class JsonController {
     public async getJson  (ctx:Context){

    };

    public async putJson (ctx:Context) {
        try {
            console.log(ctx.request.body)
            const user = ctx.state.user[0];
            const {file}= ctx.request.files;
            await jsonService.putJson(user.id, file);

            ctx.status = 200;
            ctx.body ='The file has been saved'
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    };}

export const jsonController = new JsonController();
