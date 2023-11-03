import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";

import {configs} from "../config";
import {ApiError} from "../errors";
import {authRepository, userRepository} from "../repositories";

const tokenSecret = configs.ACCESS_TOKEN_SECRET;

class AuthenticateMiddleware {
    public async isLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const {authorization} = req.headers;
            if (!authorization) {
                throw new ApiError("Authorization header missing", 401);
            }

            const [bearer, token] = authorization.split(" ");
            if (!bearer || !token) {
                throw new ApiError("Not authorized", 401);
            }

            const {userId} = jwt.verify(token, tokenSecret) as jwt.JwtPayload;
            const user = await userRepository.findById(userId);

            const tokenModel = await authRepository.findToken(userId);

            if (!user || !tokenModel) {
                throw new ApiError("Token not valid", 401);
            }

            res.locals.user = user;
            next();
        } catch (err) {
            next(err);
        }
    }
}

export const authenticateMiddleware = new AuthenticateMiddleware();
