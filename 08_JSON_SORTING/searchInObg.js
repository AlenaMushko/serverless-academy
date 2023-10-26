export const searchInObg = (searchValue, data) => {
  if (typeof data === "object") {
    for (const key in data) {
      if (key === searchValue) {
        return data[key];
      } else {
        const result = searchInObg(searchValue, data[key]);
        if (result !== undefined) {
          return result;
        }
      }
    }
  } else {
    return undefined;
  }
  return undefined;
};
