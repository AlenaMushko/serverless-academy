import {NextFunction, Request, Response} from "express";

import {urlRepository} from "../repositories";
import {ApiError} from "../errors";

class UrlMiddleware {
    public async isOriginalUrl(req: Request,
                               res: Response,
                               next: NextFunction,) {
        try {
            const {url} = req.body;
            new URL(url.trim());
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isExistUrlInDB(req: Request,
                                res: Response,
                                next: NextFunction,) {
        try {
            const urlModel = await urlRepository.getUrlByParams({_id: req.params.urlId.trim()});
            if(!urlModel){
                throw new ApiError('URL does not exist', 404)
            }

            res.locals.urlModel = urlModel;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const urlMiddleware = new UrlMiddleware();
