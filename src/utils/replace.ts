/** 字符串中英文字母全部改成大写 */
export const bytesToUpperCase = (string: string) => {
  return string.replaceAll(/([a-z]+)/g, (match) => match.toUpperCase());
};

/** 字符串中英文字母全部改成小写 */
export const bytesToLowerCase = (string: string) => {
  return string.replaceAll(/([A-Z]+)/g, (match) => match.toLowerCase());
};

/** 字符串首字母大写 */
export const stringToCapitalize = (string: string) => {
  return string.replaceAll(/^([a-z]{1})/g, (match) => match.toUpperCase());
};
