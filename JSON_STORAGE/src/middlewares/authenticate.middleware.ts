import * as jwt from "jsonwebtoken";
// import { JwtPayload } from "jsonwebtoken";
import {Context, Next} from "koa";

import {configs} from "../config";
import {ApiError} from "../errors";
import {authRepository, userRepository} from "../repositories";

// import { tokenRepository } from "../repositories/token.repository";

const tokenSecret = configs.ACCESS_TOKEN_SECRET;

class AuthenticateMiddleware {
    public async isLogin(ctx: Context, next: Next) {
        try {
            const {authorization} = ctx.headers;

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

            ctx.state.user = user;
            ctx.state.tokenModel = tokenModel;

            await next();
        } catch (err) {
            ctx.throw(err.status, err.message);
        }
    }
}

export const authenticateMiddleware = new AuthenticateMiddleware();
