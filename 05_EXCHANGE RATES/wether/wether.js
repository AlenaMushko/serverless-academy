import bot, { weatherMenu } from "../app.js";
import { getCityLocation, getWeatherInfo } from "../services/index.js";

let timerId = null;
export const enterCityName = (chatId) => {
  bot.sendMessage(
    chatId,
    "Введіть назву міста, де Ви хочете переглядати погоду",
  );
};

export const getWeather = async (chatId, messageText, type) => {
  let cityLocation = null;
  let weatherData = null;
  try {
    cityLocation = await getCityLocation(messageText);
    const lat = cityLocation.data[0].lat;
    const lon = cityLocation.data[0].lon;

    if (lat && lon) {
      weatherData = await getWeatherInfo(lat, lon);
    }
  } catch (err) {
    bot.sendMessage(
      chatId,
      `Вибачте, але ${messageText} міста немає в моїй базі. Спробуте знову.`,
    );
  }

  switch (type) {
    case "3":
    case "6":
      clearInterval(timerId);
      await sendWeatherToUser(chatId, messageText, weatherData);
      subscription(chatId, messageText, type, cityLocation);
      bot.sendMessage(chatId, "Виберіть, що вас цікавить", {
        reply_markup: {
          keyboard: weatherMenu,
          resize_keyboard: true,
        },
      });
      break;
    case "вітер":
      await sendWindToUser(chatId, messageText, weatherData);
      bot.sendMessage(chatId, "Виберіть, що вас цікавить", {
        reply_markup: {
          keyboard: weatherMenu,
          resize_keyboard: true,
        },
      });
      break;
    default:
      bot.sendMessage(chatId, "Виберіть, що вас цікавить", {
        reply_markup: {
          keyboard: weatherMenu,
          resize_keyboard: true,
        },
      });
      break;
  }
};

const sendWeatherToUser = async (chatId, messageText, cityWeather) => {
  try {
    const data = cityWeather.data.list[0];
    const temp = Math.round(data.main.temp);

    const clouds = data.weather[0].description;
    const visibility = data.visibility;
    const pop = data.pop;

    bot.sendMessage(
      chatId,
      `<b>🏙️️ Погода у місті - ${messageText}</b>\n
     🌡️ Темпетатура повітря ${temp}°C\n
     ☁️ На небі ${clouds}\n
     🌫️ Видимість на дорогах - ${visibility}m\n
     🌧️ Ймовірність опадів - ${pop}%\n
                  <b>Бажаємо сонця і тепла навколо, незалежно від погоди 💕</b>`,
      { parse_mode: "HTML" },
    );
  } catch (err) {
    bot.sendMessage(
      chatId,
      `Вибачте, я не маю даних про погоду в місті <b>${messageText}</b>. Спробуйте ще раз`,
      { parse_mode: "HTML" },
    );
  }
};

const sendWindToUser = async (chatId, messageText, weatherData) => {
  try {
    const data = weatherData.data.list[0].wind;
    const speed = data.speed;
    const deg = data.deg;
    const gust = data.gust;
    bot.sendMessage(
      chatId,
      `<b>🏙️️ Погода у місті - ${messageText}</b>\n
     🌬️  Швидкість вітру: ${speed} м/с
     ↗️  Напрямок вітру: ${deg}°
    💨  Пориви вітру: ${gust} м/с
🔔   <b>Підпишіться на погоду в нашому боті, та зможите отримувати актуальну погоду декілька разів на добу 💕</b>`,
      { parse_mode: "HTML" },
    );
  } catch (err) {
    bot.sendMessage(
      chatId,
      `Вибачте, я не маю даних про вітер в місті <b>${messageText}</b>. Спробуйте ще раз`,
      { parse_mode: "HTML" },
    );
  }
};

const subscription = async (chatId, messageText, type, cityLocation) => {
  const lat = cityLocation.data[0].lat;
  const lon = cityLocation.data[0].lon;
  let weatherData = null;
  const hours = type * 60 * 60 * 1000;

  timerId = setInterval(async () => {
    if (lat && lon) {
      weatherData = await getWeatherInfo(lat, lon);
    }

    sendWeatherToUser(chatId, messageText, weatherData);
  }, hours);
};
