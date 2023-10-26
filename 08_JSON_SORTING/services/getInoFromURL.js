import axios from "axios";

import { constantsForEndpoint } from "../constants/index.js";
import { searchInObg } from "../searchInObg.js";

const searchValue = constantsForEndpoint.searchValue;
export const getInoFromURL = async (url, limitCol) => {
  let colUrl = 0;

  while (colUrl < limitCol) {
    try {
      const { data } = await axios.get(url);
      const isDoneValue = searchInObg(searchValue, data);
      console.log(`[Success] ${url}: isDone - ${isDoneValue}`);
      return isDoneValue;
    } catch (e) {
      colUrl++;
      if (colUrl >= limitCol) {
        console.error(`[Fail] ${url}: The endpoint is unavailable`);
      }
    }
  }
};
