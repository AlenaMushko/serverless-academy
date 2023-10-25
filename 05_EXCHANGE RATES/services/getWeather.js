import axios from "axios";

import { getConfigs } from "../config/index.js";
import { botConstant } from "../constant/index.js";

const configs = await getConfigs();

export const getCityLocation = async (messageText) => {
  const localURL = `${
    botConstant.WEATHER_URL
  }geo/1.0/direct?q=${messageText.toLowerCase()}&appid=${configs.OW_API_KEY}`;

  const data = await axios.get(localURL);
  return data;
};

export const getWeatherURL = (lat, lon) => {
  const weatherData = `${botConstant.WEATHER_URL}data/2.5/forecast?lat=${lat}&lon=${lon}&lang=uk&units=metric&appid=${configs.OW_API_KEY}`;
  return weatherData;
};

export const getWeatherInfo = async (lat, lon) => {
  const url = getWeatherURL(lat, lon);
  const data = await axios.get(url);
  return data;
};
