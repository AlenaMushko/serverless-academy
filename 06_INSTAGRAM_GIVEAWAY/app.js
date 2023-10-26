import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, "names");

let namesArr = [];

try {
  const files = fs.readdirSync(folderPath, "utf8");

  files.forEach((file) => {
    const filePath = path.resolve(__dirname, "names", `${file}`);
    const filesData = fs.readFileSync(filePath, "utf8");
    namesArr = namesArr.concat(filesData.split("\n"));
  });

  const nameCounts = getObjMap(files);

  const uniqueUserName = uniqueValues(namesArr); //                                    value = 129240,        uniqueValues: 241.467ms
  const usersNamesLength = existInAllFiles(nameCounts); //                             value = 2628,          existInAllFiles: 0.006ms
  const usersNamesLengthForSomeFiles = existInAtleastTen(nameCounts, 10); //  value = 108345,        existInAtleastTen: 0.002ms

  callTimeWorkFoo(
    namesArr,
    files,
    uniqueUserName,
    usersNamesLength,
    usersNamesLengthForSomeFiles,
  );
} catch (err) {
  console.log(err.message);
}

function uniqueValues(usersName) {
  const set = new Set(usersName);
  const uniqueUsersArrLength = [...set].length;
  return uniqueUsersArrLength;
}

function getObjMap(files) {
  const nameCounts = new Map();

  files.forEach((file) => {
    const filePath = path.resolve(__dirname, "names", `${file}`);
    const filesData = fs.readFileSync(filePath, "utf8");
    const namesArr = filesData.split("\n");

    namesArr.forEach((name) => {
      nameCounts.set(name, (nameCounts.get(name) || 0) + 1);
    });
  });

  return nameCounts;
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
  existInAllFiles(files);
  console.timeEnd("existInAllFiles");
  console.log(usersNamesLength);

  console.time("existInAtleastTen");
  existInAtleastTen(files, 10);
  console.timeEnd("existInAtleastTen");
  console.log(usersNamesLengthForSomeFiles);
}
