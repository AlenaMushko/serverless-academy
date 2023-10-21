import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersPath = path.join(__dirname, 'users.txt');

const startCreateUser = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Enter the user\'s name.To cancel press ENTER:',
            type: 'input'
        }
    ])
        .then(function (answer) {
            if (answer.name === '') {
                seeDB();
            } else {
                createUser(answer);
            }
        })
        .catch((err) => console.log(err.message));
}

const createUser = (userName) => {
    inquirer.prompt([
        {
            name: "gender",
            message: "Choose your Gender.",
            type: "list",
            choices: ["male", "female"]
        },
        {
            name: 'age',
            message: 'Enter your age:',
            type: 'input'
        },
    ])
        .then(function (answer) {
            const user = {...userName, ...answer};

            let users = getDBUsers();
            users.push(user);

            fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            })
            startCreateUser();
        })
        .catch((err) => console.log(err.message));
}

const seeDB = () => {
    inquirer.prompt([
        {
            name: "seeDB",
            message: "Would you to search values in DB?",
            type: "list",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (answer) {
            if (answer.seeDB === "Yes") {
                const users = getDBUsers();
                console.log(users);
                findUser();
            }
            if (answer.seeDB === "No") {
                console.log('by-by');
                process.exit();
            }
        });
}

const findUser = () => {
    inquirer.prompt([
        {
            name: "userName",
            message: "Enter user\'s name you wanna find in DB?",
            type: 'input'
        }
    ])
        .then(function (answer) {
            const userName = answer.userName.trim().toLowerCase();
            const users = getDBUsers();
            const foundUser = users.find(user =>
                user && user.name.trim().toLowerCase() === userName
            );

            if (foundUser) {
                console.log(`User ${foundUser.name} was found.`);
                console.log(foundUser);
            } else {
                console.log(`User ${answer.userName} wasn't found.`);
            }

            startCreateUser();
        });
}

const getDBUsers = () => {
    try {
        const users = fs.readFileSync(usersPath, 'utf8');

        if (users.trim().length === 0) {
            return []
        }

        return JSON.parse(users);
    } catch (e) {
        throw new Error(e.message)
    }

}

startCreateUser();



