import { config } from "dotenv";

config();

export const configs = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_NAME: process.env.BOT_NAME,
};
