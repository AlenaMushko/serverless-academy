import {IUser} from "../types/user.type";
import pool from "../config/db";
import {ApiError} from "../errors";
import {IToken} from "../types";

class AuthRepository {
    public async findOneUser(email: string): Promise<IUser> {
        const query = 'SELECT * FROM users WHERE email = $1';
        try {
            const res = await pool.query(query, [email]);
            if (res.rows.length === 0) {
                return null;
            }

            return res.rows[0] as IUser;
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }

    public async addTokenToTable(values:IToken): Promise<IToken> {
        const query = 'INSERT INTO tokens ( user_id, user_email, accesstoken, refreshtoken) VALUES($1, $2, $3, $4)';
        try {
            await pool.query(query, [values.user_id, values.user_email, values.accesstoken, values.refreshtoken]);
            return await this.findToken(values.user_id)
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }

    public async findToken(user_id: number): Promise<IToken> {
        const query = 'SELECT * FROM tokens WHERE user_id = $1';
        try {
            const res = await pool.query(query, [user_id]);
            if (res.rows.length === 0) {
                return null;
            }
            return res.rows[0] as IToken;
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }

    public async deleteToken(user_id: number): Promise<void> {
        const query = 'DELETE FROM tokens WHERE user_id = $1';
        try {
            await pool.query(query, [user_id]);
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }

    public async createUser(email: string, password: string): Promise<number> {
        const query = 'INSERT INTO users (email, password) VALUES($1, $2)';
        try {
            await pool.query(query, [email, password]);
            const user = await this.findOneUser(email)
            return user.id;
        } catch (err) {
            throw new ApiError(err.message, err.status);
        }
    }
}

export const authRepository = new AuthRepository();
