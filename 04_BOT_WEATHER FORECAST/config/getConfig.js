import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToENV = path.resolve(__dirname, "..", ".env");

let BOT_TOKEN = null;
let BOT_NAME = null;
let OW_API_KEY = null;

const getEnvValue = async () => {
  try {
    const data = await fs.promises.readFile(pathToENV, "utf8");
    const arrENV = data.trim().split("\n");

    const objENV = arrENV.reduce((acc, valueENV) => {
      const [key, value] = valueENV.split("=");
      acc[key] = value;
      return acc;
    }, {});
    return objENV;
  } catch (e) {
    throw new Error(e);
  }
};

const writeEnvValue = async () => {
  const objEnv = await getEnvValue();

  BOT_TOKEN = objEnv.BOT_TOKEN;
  BOT_NAME = objEnv.BOT_NAME;
  OW_API_KEY = objEnv.OW_API_KEY;
};

export const getConfigs = async () => {
  await writeEnvValue();
  return {
    BOT_TOKEN,
    BOT_NAME,
    OW_API_KEY,
  };
};
