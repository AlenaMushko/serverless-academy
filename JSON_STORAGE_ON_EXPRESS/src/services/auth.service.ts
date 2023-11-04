import {IUser} from "../types/user.type";
import {ApiError} from "../errors";
import {passwordService} from "./passwordService";
import {authRepository} from "../repositories";
import {tokenService} from "./tokenService";
import {IToken} from "../types";

class AuthService {
    public async signUp(body: IUser): Promise<IToken> {
       try {
                const {password, email} = body;
                const hashadPassword = await passwordService.hash(password.trim());

                const userId = await authRepository.createUser(email.trim(), hashadPassword)

                const {accesstoken, refreshtoken} = await tokenService.generateTokenPairs(userId);

                const result = await authRepository.addTokenToTable({user_email: email.trim(), user_id:userId, accesstoken, refreshtoken});
                return result;
            } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    }

    public async signIn(id:number, email:string): Promise<IToken> {
        try {
            await authRepository.deleteToken(id);
            const {accesstoken, refreshtoken} = await tokenService.generateTokenPairs(id);

            const result = await authRepository.addTokenToTable({user_email:email, user_id:id, accesstoken, refreshtoken});

            return result;
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    }
}

export const authService = new AuthService();
