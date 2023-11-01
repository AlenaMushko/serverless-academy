import { Context } from "koa";

import {authService} from "../services/auth.service";
import {IUser} from "../types/user.type";

class AuthController {
    public async signUp(ctx: Context): Promise<void>{
        try {
            const body = ctx.request.body as IUser;
            const result = await authService.signUp(body);

            const {user_id, accesstoken, refreshtoken}=result;

            ctx.status = 201;
            ctx.body = {
                success: true,
                data: {
                    id: user_id,
                    accessToken: accesstoken,
                    refreshToken: refreshtoken
                }
            };
        } catch (err) {
          ctx.throw(err.status, err.message)
        }
    }

    public async signIn(ctx: Context): Promise<void> {
        try {
            const user =ctx.state.user;
            const result = await authService.signIn(user.id, user.email);

            const {user_id, accesstoken, refreshtoken} = result;

            ctx.status = 200;
            ctx.body = {
                success: true,
                data: {
                    id: user_id,
                    accessToken: accesstoken,
                    refreshToken: refreshtoken
                }
            };
        } catch (err) {
            ctx.throw(err.status, err.message)
        }
    }
}

export const authController = new AuthController();
