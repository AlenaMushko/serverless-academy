import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { constantsForEndpoint } from "./constants/index.js";
import { getInoFromURL } from "./services/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, "endpoints.txt");

const getUrlDataLimit = constantsForEndpoint.getEndpointLimit;
let isDone = 0;
let notDone = 0;

const fileContent = fs.readFileSync(folderPath, "utf8");
const endpoints = fileContent.trim().split("\n");

const getData = async () => {
  let res = null;
  for (const endpoint of endpoints) {
    res = await getInoFromURL(endpoint.trim(), getUrlDataLimit);
    separationIsDoneValue(res);
  }
};

const separationIsDoneValue = (value) => {
  if (value === true) {
    isDone++;
  } else if (value === false) {
    notDone++;
  }
};

await getData();

console.log(`Found True values: ${isDone}`);
console.log(`Found False values: ${notDone}`);
