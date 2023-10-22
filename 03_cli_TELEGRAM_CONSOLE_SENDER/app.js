import { Command } from "commander";
import fs from "fs";
import TelegramBot from "node-telegram-bot-api";

import { getIDs, pushID } from "./botIDs.js";
import { configs } from "./config/index.js";

const program = new Command();

const token = configs.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const BOT_NAME = configs.BOT_NAME;
const IDs = getIDs();

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const useName = msg.chat.first_name;

  if (messageText === "/start") {
    pushID(chatId.toString());
    bot.sendMessage(chatId, ` ${useName}, Welcome to the bot!`);
  }
});

program
  .name("cli-Alona")
  .description("CLI for my first telegram Bot")
  .version("0.1.0");

program
  .option("-V, --version", "output the version")
  .option("-h, --help", "display help for command");

program
  .command("message <message>")
  .alias("m")
  .description("Send message to telegram Bot")
  .action((msg) => {
    const promises = IDs.map((chatId) => {
      return bot
        .sendMessage(chatId, msg)
        .then(() => {
          console.log(`Message '${msg}' was sent to ${BOT_NAME}`);
        })
        .catch((err) => {
          console.log("Was not send message:", err);
        });
    });

    Promise.allSettled(promises).then(() => {
      process.exit();
    });
  });

// node app.js p /Users/olena/Desktop/serverless/serverless-academy/03_cli_TELEGRAM_CONSOLE_SENDER/assets/1.jpeg
program
  .command("photo <path>")
  .alias("p")
  .description("Send photo to telegram Bot")
  .action((path) => {
    const photo = fs.createReadStream(path);

    const promises = IDs.map((chatId) => {
      return bot
        .sendPhoto(chatId, photo)
        .then(() => {
          console.log(`File '${photo}' was sent to ${BOT_NAME}`);
        })
        .catch((err) => {
          console.log("File was not send:", err);
        });
    });

    Promise.allSettled(promises).then(() => {
      process.exit();
    });
  });
program
  .command("help [command]")
  .description("display help for command")
  .action(() => {
    program.outputHelp();
  });

program.parse(process.argv);
