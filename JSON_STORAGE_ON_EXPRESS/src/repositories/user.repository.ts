import { IUser } from "../types/user.type";
import {ApiError} from "../errors";
import pool from "../config/db";

class UserRepository {
  public async findById(userId: string): Promise<IUser> {
      const query = 'SELECT*FROM users WHERE id = $1'
      try {
          const res = await pool.query(query, [userId])
          if(res.rows.length === 0){
              return null;
          }

          return res.rows as unknown as IUser;
      } catch (err) {
          throw new ApiError('User not founded', 404)
      }
  }
}

export const userRepository = new UserRepository();
