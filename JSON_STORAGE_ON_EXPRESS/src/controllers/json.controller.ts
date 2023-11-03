import {NextFunction, Request, Response} from "express";

import {jsonService} from "../services";
import {IMessage} from "../types";

class JsonController {
    public async getListJson(req: Request,
                             res: Response,
                             next: NextFunction): Promise<Response<string[]>> {
        try {
            const {id} = res.locals.user[0];

            const jsonListFromBucket = await jsonService.getListJson(id)

            return res.status(200).json(jsonListFromBucket);
        } catch (err) {
            next(err)
        }
    };

    public async getJson(req: Request,
                         res: Response,
                         next: NextFunction): Promise<Response<string>> {
        try {
            const path = req.path;
            const jsonFromBucket = await jsonService.getJson(path)

            return res.status(200).json(jsonFromBucket);
        } catch (err) {
            next(err)
        }
    };

    public async putJson(req: Request,
                         res: Response,
                         next: NextFunction): Promise<Response<IMessage>> {
        try {
            const {id} = res.locals.user[0];
            const {file} = req.files;

            await jsonService.putJson(id, file);

            return res.status(200).json('The file has been saved');
        } catch (err) {
            next(err)
        }
    };
}

export const jsonController = new JsonController();
