import {Context} from "koa";
import {jsonService} from "../services";
import {ApiError} from "../errors";
// import axios from 'axios';


class JsonController {
     public async getJson  (ctx:Context){
        const user = ctx.state.user;
        const tokenModel = ctx.state.tokenModel;
         const fileJson = ctx.request.files?.fileJson;

         console.log(user, tokenModel)
         console.log(fileJson)
        // const jsonPath = ctx.params.jsonPath;
        // try {
        //     const response = await axios.get(`http://jsonbase.com/${jsonPath}`);
        //     const jsonData = response.data;
        //     ctx.assert(jsonData, 404, 'JSON data not found');
        //
        //     this.events_db = jsonData;
        //     console.log(this.events_db)
        //     ctx.body = jsonData;
        //     ctx.status = 200;
        // } catch (error) {
        //     ctx.status = error.response?.status || 500;
        //     ctx.body = error.response?.data || { message: 'An error occurred while fetching data' };
        // }
    };

    public async putJson (ctx:Context) {
        try {
            const user = ctx.state.user;
            const fileJson = ctx.request.files?.fileJson;
            await jsonService.putJson(user.id, fileJson);

            ctx.status = 200;
            ctx.body ='The file has been saved'
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    };}

export const jsonController = new JsonController();
