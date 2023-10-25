import axios from "axios";

import { botConstant } from "../constant/index.js";

export const getMonoCurrencyRate = async () => {
  const monoURL = `${botConstant.MONO_URL}`;

  const data = await axios.get(monoURL);
  return data;
};

export const getPrivateCurrencyRate = async () => {
  const privateURL = `${botConstant.PRIVATE_URL}`;

  const data = await axios.get(privateURL);
  return data;
};
