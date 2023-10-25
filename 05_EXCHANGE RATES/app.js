import TelegramBot from "node-telegram-bot-api";

import { getConfigs } from "./config/index.js";
import { getRate } from "./currency/currency.js";
import { enterCityName, getWeather } from "./wether/index.js";

const configs = await getConfigs();

const token = configs.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const BOT_NAME = configs.BOT_NAME;

const mainMenu = [["/погода"], ["/курс валют"]];

export const currencyMenu = [["USD", "EUR"], ["попереднє меню"]];

export const weatherMenu = [
  [" кожні 3 години", " кожні 6 годин"],
  [" вітер"],
  ["попереднє меню"],
];

const userState = {};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.trim();
  const useName = msg.chat.first_name;

  if (userState[chatId] && userState[chatId].state === "msgForWeather") {
    if (
      ["кожні 3 години", "кожні 6 годин", "вітер", "попереднє меню"].includes(
        messageText,
      )
    ) {
      enterCityName(chatId);
      return;
    } else {
      getWeather(chatId, messageText, userState[chatId].case);
      delete userState[chatId];
      return;
    }
  }

  switch (messageText) {
    case "/start":
      bot.sendMessage(chatId, ` ${useName}, Вітаємо в ${BOT_NAME}!`);
      bot.sendMessage(chatId, "Оберіть опцію:", {
        reply_markup: {
          keyboard: mainMenu,
          resize_keyboard: true,
        },
      });
      break;
    case "/погода":
      bot.sendMessage(chatId, "Виберіть, що вас цікавить", {
        reply_markup: {
          keyboard: weatherMenu,
          resize_keyboard: true,
        },
      });
      break;
    case "кожні 3 години":
      userState[chatId] = { state: "msgForWeather", case: "3" };
      enterCityName(chatId);
      break;
    case "кожні 6 годин":
      userState[chatId] = { state: "msgForWeather", case: "6" };
      enterCityName(chatId);
      break;
    case "вітер":
      userState[chatId] = { state: "msgForWeather", case: "вітер" };
      enterCityName(chatId);
      break;

    case "/курс валют":
      bot.sendMessage(chatId, "Оберіть валюту:", {
        reply_markup: {
          keyboard: currencyMenu,
          resize_keyboard: true,
        },
      });
      break;
    case "USD":
      getRate(chatId, messageText);
      break;
    case "EUR":
      getRate(chatId, messageText);
      break;
    case "попереднє меню":
      delete userState[chatId];
      bot.sendMessage(chatId, "Головне меню:", {
        reply_markup: {
          keyboard: mainMenu,
          resize_keyboard: true,
        },
      });
      break;
    default:
      bot.sendMessage(chatId, "Оберіть опцію:", {
        reply_markup: {
          keyboard: mainMenu,
          resize_keyboard: true,
        },
      });
      break;
  }
});

export default bot;
