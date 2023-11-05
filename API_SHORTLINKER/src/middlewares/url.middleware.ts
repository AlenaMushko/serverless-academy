import {NextFunction, Request, Response} from "express";
import NodeCache from 'node-cache';

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

    public async checkCache(req: Request,
                            res: Response,
                            next: NextFunction){
        const urlCache = new NodeCache({stdTTL: 60*60*24*7});

        try {
            const urlId = req.params.urlId.trim();
            const cachedUrl = urlCache.get(urlId);
            if(cachedUrl){
                res.locals.urlModel = cachedUrl;
                return next();
            }
            const urlModel = await urlRepository.getUrlByParams({_id: urlId});
            if(!urlModel){
                throw new ApiError('URL does not exist', 404)
            }

            urlCache.set(urlId, urlModel);
            res.locals.urlModel = urlModel;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const urlMiddleware = new UrlMiddleware();
