import bcrypt from 'bcrypt';

import {ApiError} from "../errors";

class PasswordService {
    public async hash(value:string):Promise<string>{
        try {
            return await bcrypt.hash(value, 7);
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    }

    public async compare(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const passwordService = new PasswordService();
