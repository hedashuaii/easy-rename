import fs from "fs";
import path from "path";
import { EFileType } from "./../types/index";

const { statSync } = fs
const { dirname, extname } = path

/** 获取文件的类型 */
export const getFileType = (filePath: string) => {
  const state = statSync(filePath);

  if (state.isDirectory()) {
    return EFileType.FOLDER;
  } else if (state.isFile()) {
    return EFileType.FILE;
  }

  return undefined;
};

/** 获取文件所在的文件夹 */
export const getFileChannelPath = (filePath: string) => {
  return dirname(filePath);
};

/** 获取文件的扩展名 */
export const getFileExtension = (filePath: string) => {
  return extname(filePath);
};
