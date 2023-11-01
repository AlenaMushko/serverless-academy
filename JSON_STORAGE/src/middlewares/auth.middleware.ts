import {Context, Next} from "koa";

import {authRepository} from "../repositories";
import {ApiError} from "../errors";
import {IUser} from "../types/user.type";
import {passwordService} from "../services/passwordService";


class AuthMiddleware {
    public async uniqueEmail(ctx: Context, next: Next) {
        try {
            const body = ctx.request.body as IUser;

            const user = await authRepository.findOneUser(body.email);
            if (user) {
                throw new ApiError("Email already exists", 409);
            }

           await next();
        } catch (e) {
           ctx.throw(e.status, e.message);
        }
    }

    public async isUserExist(ctx: Context, next: Next) {
        try {
            const body = ctx.request.body as IUser;

            const user = await authRepository.findOneUser(body.email);
            if (!user) {
                throw new ApiError("Invalid email or password", 404);
            }

            const isMatched = await passwordService.compare(
                body.password,
                user.password,
            );
            if (!isMatched) {
                throw new ApiError("Invalid email or password", 404);
            }

           ctx.state.user = user;

            await next();
        } catch (e) {
            ctx.throw(e.status, e.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
