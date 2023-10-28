import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, "names");

let namesArr = [];
const nameCounts = new Map();

try {
  const files = fs.readdirSync(folderPath, "utf8");

  files.forEach((file) => {
    const filePath = path.resolve(__dirname, "names", `${file}`);
    const filesData = fs.readFileSync(filePath, "utf8").split("\n");
    const uniqueNames = uniqueValuesFromOneFile(filesData); // get uniqueValues from each files

    namesArr = namesArr.concat(uniqueNames); // get arr uniqueValues from all files

    uniqueNames.forEach((name) => {
      if (nameCounts.has(name)) {
        nameCounts.set(name, nameCounts.get(name) + 1);
      } else {
        nameCounts.set(name, 1);
      }
    });
  });

  const uniqueUserName = uniqueValues(namesArr); //                                    value = 129240,        uniqueValues: 145.556ms
  const usersNamesLength = existInAllFiles(nameCounts); //                             value = 441,           existInAllFiles: 0.937ms
  const usersNamesLengthForSomeFiles = existInAtleastTen(nameCounts, 10); //  value = 73245,        existInAtleastTen: 1.992ms

  callTimeWorkFoo(
    namesArr,
    files,
    uniqueUserName,
    usersNamesLength,
    usersNamesLengthForSomeFiles,
  );
} catch (err) {
  console.log(err.message);
  throw new Error(err.message);
}

function uniqueValuesFromOneFile(data) {
  const set = new Set(data);
  const uniqueUsersArr = [...set];
  return uniqueUsersArr;
}

function uniqueValues(usersName) {
  const set = new Set(usersName);
  const uniqueUsersArrLength = [...set].length;
  return uniqueUsersArrLength;
}

function existInAllFiles(nameCounts) {
  const arrNames = [];

  nameCounts.forEach((count, name) => {
    if (count === 20) {
      arrNames.push(name);
    }
  });
  return arrNames.length;
}

function existInAtleastTen(nameCounts, countFiles) {
  const arrNames = [];

  nameCounts.forEach((count, name) => {
    if (count >= countFiles) {
      arrNames.push(name);
    }
  });
  return arrNames.length;
}

function callTimeWorkFoo(
  namesArr,
  files,
  uniqueUserName,
  usersNamesLength,
  usersNamesLengthForSomeFiles,
) {
  console.time("uniqueValues");
  uniqueValues(namesArr);
  console.timeEnd("uniqueValues");
  console.log(uniqueUserName);

  console.time("existInAllFiles");
  existInAllFiles(nameCounts);
  console.timeEnd("existInAllFiles");
  console.log(usersNamesLength);

  console.time("existInAtleastTen");
  existInAtleastTen(nameCounts, 10);
  console.timeEnd("existInAtleastTen");
  console.log(usersNamesLengthForSomeFiles);
}
