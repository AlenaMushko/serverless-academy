import {NextFunction, Request, Response} from "express";
import {authService} from "../services";
import {ICredentials} from "../types";

class AuthController {
    public async signUp(req: Request,
                        res: Response,
                        next: NextFunction): Promise<Response<ICredentials>>{
        try {
            const result = await authService.signUp(req.body);

            const {user_id, accesstoken, refreshtoken}=result;
            const response = {
                success: true,
                data: {
                    "id": user_id,
                    "accessToken": accesstoken,
                    "refreshToken": refreshtoken
                }
            };
            return res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request,
                        res: Response,
                        next: NextFunction): Promise<Response<ICredentials>> {
        try {
            const user = res.locals.user;
            const result = await authService.signIn(user.id, user.email);

            const {user_id, accesstoken, refreshtoken} = result;

            const response = {
                success: true,
                data: {
                    "id": user_id,
                    "accessToken": accesstoken,
                    "refreshToken": refreshtoken
                }
            };
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
