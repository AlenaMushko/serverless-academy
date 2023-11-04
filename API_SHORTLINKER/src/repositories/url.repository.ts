import { FilterQuery } from "mongoose";

import {IUrl} from "../types";
import {UrlModel} from "../models";
import {ApiError} from "../errors";

class UrlRepository {
    public async getUrlByParams(
        params: FilterQuery<IUrl>,
        selection?: string[],
    ): Promise<IUrl> {
        try {
            return await UrlModel.findOne(params, selection);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async createUrl(id:string,origUrl:string, shortUrl:string):Promise<IUrl>{
        try {
            return await UrlModel.create( { _id: id, origUrl, shortUrl });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const urlRepository = new UrlRepository();
