import { NextFunction, Request, Response } from "express";

import {ApiError} from "../errors";
import {authRepository} from "../repositories";
import {passwordService} from "../services";


class AuthMiddleware {
    public async uniqueEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authRepository.findOneUser(req.body.email.trim());

            if (user) {
                throw new ApiError("Email already exists", 409);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUserExist(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authRepository.findOneUser(req.body.email.trim());
            if (!user) {
                throw new ApiError("Invalid email or password", 404);
            }

            const isMatched = await passwordService.compare(
                req.body.password,
                user.password,
            );
            if (!isMatched) {
                throw new ApiError("Invalid email or password", 404);
            }

            res.locals.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
