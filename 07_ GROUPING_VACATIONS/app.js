import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.resolve(__dirname, "data.json");
const newUsersDataPath = path.join(__dirname, "newUsersData.json");

try {
  const users = JSON.parse(fs.readFileSync(folderPath, "utf8"));
  let usersId = [];
  let uniqueUserId = [];

  users.map((value) => {
    const userId = value.user._id;
    usersId = usersId.concat(userId.split("\n"));
    uniqueUserId = new Set(usersId);
  });

  const formattedUsers = [...uniqueUserId].map((userId) => {
    const userVacations = users.filter((user) => user.user._id === userId);

    const vacations = userVacations.map((vacation) => {
      return {
        startDate: vacation.startDate,
        endDate: vacation.endDate,
      };
    });

    return {
      userId,
      userName: userVacations[0].user.name,
      vacations,
    };
  });

  const writeToFile = (filePath, data) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) throw new Error(err.message);
    });
  };

  fs.access(newUsersDataPath, (err) => {
    if (err) throw new Error(err.message);
    writeToFile(newUsersDataPath, formattedUsers);
  });
} catch (err) {
  console.log(err.message);
  throw new Error(err.message);
}
