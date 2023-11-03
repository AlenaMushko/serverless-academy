import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import {avatarConfig} from "../constants";

class JsonMiddleware {
    public async isJsonValid(req: Request, res: Response, next: NextFunction) {
        try {
            const jsonFile =  req.files.file;
            if (!jsonFile) {
                throw new ApiError("File was not uploaded", 401);
            }

            const files= Array.isArray(jsonFile) ? jsonFile : [jsonFile];

            files.forEach((file)=>{
                const { mimetype, size } = file;

                if (mimetype !== avatarConfig.MIMETYPES) {
                    throw new ApiError('File has invalid format', 400);
                }
                if (size > avatarConfig.MAX_SIZE) {
                    throw new ApiError("File is too big", 400);
                }
            })

           next();
        } catch (err) {
            next();
        }
    }
}

export const jsonMiddleware = new JsonMiddleware();
