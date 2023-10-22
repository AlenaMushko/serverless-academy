import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const botIDsPath = path.join(__dirname, "botIDs.txt");

export const getIDs = () => {
  try {
    const IDs = fs.readFileSync(botIDsPath, "utf8");

    if (IDs.trim().length === 0) {
      return [];
    }

    return JSON.parse(IDs);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const pushID = (newID) => {
  const IDs = getIDs();

  if (!IDs.includes(newID)) {
    IDs.push(newID);

    fs.writeFile(botIDsPath, JSON.stringify(IDs, null, 2), (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(`ID ${newID} has been written`);
    });
  }
};
