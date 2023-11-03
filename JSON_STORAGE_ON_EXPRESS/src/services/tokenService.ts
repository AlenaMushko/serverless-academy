import * as jwt from "jsonwebtoken";

import {IJwt} from "../types";
import {configs} from "../config";
import {ApiError} from "../errors";

const accessTokenSecret = configs.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = configs.REFRESH_TOKEN_SECRET;
const expiresInForAccesstoken = process.env.ACCESS_TOKEN_EXPIRATION;
const expiresInForRefreshtoken = process.env.REFRESH_TOKEN_EXPIRATION;

class TokenService {
    public generateTokenPairs(userId: number): IJwt {
        try {
            const accesstoken = jwt.sign({ userId }, accessTokenSecret, {
                expiresIn: expiresInForAccesstoken || "1h",
            });

            let refreshTokenOptions: jwt.SignOptions = {};

            if (process.env.REFRESH_TOKEN_EXPIRATION) {
                refreshTokenOptions.expiresIn = expiresInForRefreshtoken;
            }

            const refreshtoken = jwt.sign({ userId }, refreshTokenSecret, refreshTokenOptions);

            return { accesstoken, refreshtoken };
        } catch (err) {
            console.log(err)
            throw new ApiError(err.message, err.status);
        }
    }
}

export const tokenService = new TokenService();
