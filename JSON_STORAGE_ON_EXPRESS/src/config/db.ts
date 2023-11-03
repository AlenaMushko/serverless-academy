import fs from "fs";
import path from "path";
import { Pool } from "pg";

import { configs } from "./index";

const pool = new Pool({
  user: configs.DB_USER,
  host: configs.DB_HOST,
  database: configs.DB_NAME,
  password: configs.DB_PASSWORD,
  port: +configs.DB_PORT,
});

export const checkAndCreateTable = async () => {
  try {
    const resUserTable = await pool.query(
      "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users')",
    );
    const resTokenTable = await pool.query(
      "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tokens')",
    );
    const userTableExists = resUserTable.rows[0].exists;
    const tokenTableExists = resTokenTable.rows[0].exists;
    const userSql = fs.readFileSync(
      path.join(__dirname, "..", "tables", "user.sql"),
      "utf8",
    );
    const tokenSql = fs.readFileSync(
      path.join(__dirname, "..", "tables", "token.sql"),
      "utf8",
    );

    if (!userTableExists) {
      await pool.query(userSql);
    }

    if (!tokenTableExists) {
      await pool.query(tokenSql);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default pool;
