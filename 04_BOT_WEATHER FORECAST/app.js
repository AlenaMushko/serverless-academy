import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

import { getConfigs } from "./config/index.js";
import { botConstant } from "./constant/index.js";

const configs = await getConfigs();

const token = configs.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const BOT_NAME = configs.BOT_NAME;

let selectedHovers = null;
let timerId = null;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.trim();
  const useName = msg.chat.first_name;

  switch (messageText) {
    case "/start":
      bot.sendMessage(chatId, ` ${useName}, Welcome to the ${BOT_NAME}!`);

      periodSelection(chatId);
      break;
    case "⌛   3 hours":
      bot.sendMessage(
        chatId,
        "Welcome, enter the name of the city in which you want to see the weather",
      );

      selectedHovers = 3;
      getWeather(messageText, chatId);
      break;
    case "⌛   6 hours":
      bot.sendMessage(
        chatId,
        "Welcome, enter the name of the city in which you want to see the weather",
      );

      selectedHovers = 6;
      getWeather(messageText, chatId);

      break;
    case "🚫       stop getting weather forecast":
      if (timerId) {
        clearInterval(timerId);
      }
      selectedHovers = null;
      break;
    default:
      getWeather(messageText, chatId);
      break;
  }
});

const getWeather = async (messageText, chatId) => {
  if (
    messageText !== "/start" &&
    messageText !== "⌛   3 hours" &&
    messageText !== "⌛   6 hours"
  ) {
    const localURL = `${
      botConstant.WEATHER_URL
    }geo/1.0/direct?q=${messageText.toLowerCase()}&appid=${configs.OW_API_KEY}`;
    let cityLocation = null;
    try {
      cityLocation = await axios.get(localURL);

      const lat = cityLocation.data[0].lat;
      const lon = cityLocation.data[0].lon;

      if (lat && lon) {
        const weatherURL = `${botConstant.WEATHER_URL}data/2.5/forecast?lat=${lat}&lon=${lon}&lang=uk&units=metric&appid=${configs.OW_API_KEY}`;

        if (selectedHovers !== null) {
          if (timerId) {
            clearInterval(timerId);
          }
          await sendWeatherToUser(weatherURL, messageText, chatId);
          subscription(weatherURL, chatId, messageText);
        } else {
          await sendWeatherToUser(weatherURL, messageText, chatId);
        }
      }
    } catch (err) {
      bot.sendMessage(
        chatId,
        `Sorry, I couldn't get the weather for the ${messageText} city`,
      );
    }
  }
};

const periodSelection = async (chatId) => {
  bot.sendMessage(
    chatId,
    "Welcome, choose how often you want get the weather forecast.",
    {
      reply_markup: {
        keyboard: [
          [" ⌛   3 hours", " ⌛   6 hours"],
          ["      🚫       stop getting weather forecast"],
        ],
      },
    },
  );
};

const sendWeatherToUser = async (weatherURL, messageText, chatId) => {
  try {
    const cityWeather = await axios.get(weatherURL);
    const data = cityWeather.data.list[0];
    const temp = Math.round(data.main.temp);

    const clouds = data.weather[0].description;
    const visibility = data.visibility;
    const pop = data.pop;

    bot.sendMessage(
      chatId,
      `In town - ${messageText}. 🏙️️  Air temperature 🌡️ is ${temp}°C, cloudiness ☁️ - ${clouds}, visibility on the road 🌫️ - ${visibility}m, probability of precipitation 🌧️ - ${pop}%`,
    );
  } catch (err) {
    bot.sendMessage(
      chatId,
      `Sorry, I couldn't get the weather for the ${messageText} city`,
    );
  }
};

const subscription = (weatherURL, chatId, messageText) => {
  const hours = selectedHovers * 60 * 60 * 1000;

  timerId = setInterval(() => {
    sendWeatherToUser(weatherURL, messageText, chatId);
  }, hours);
};
