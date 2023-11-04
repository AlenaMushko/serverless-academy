import {NextFunction, Request, Response} from "express";

import {urlRepository} from "../repositories";
import {urlService} from "../services";
import {ApiError} from "../errors";

class UrlController {
    public async shortUrl(req: Request,
                          res: Response,
                          next: NextFunction,): Promise<Response<string>> {
        try {
            const urlFromBody = req.body.url.trim();
            const url = await urlRepository.getUrlByParams({origUrl: urlFromBody});

            if (url) {
                return res.status(200).json(url.shortUrl);
            }

            const newUrl = await urlService.shortUrl(urlFromBody)

            return res.status(201).json(newUrl);
        } catch (err) {
            throw new ApiError('Invalid url', 404)
        }
    }

    public async redirect(req: Request,
                          res: Response,
                          next: NextFunction): Promise<Response<string>> {
        try {
            const urlModel = res.locals.urlModel;
         return res.status(200).json(urlModel.origUrl)
        } catch (err) {
            throw new ApiError('Invalid url', 404)
        }
    }
}

export const urlController = new UrlController();
