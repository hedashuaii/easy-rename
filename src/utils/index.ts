import fs from "fs";
import path from "path";
import { EFileType, IFileListItem } from "./../types/index";

const { statSync } = fs
const { dirname, extname } = path

/** 获取文件的类型 */
export const getFileType = (file: IFileListItem) => {
  const state = statSync(file.path);

  if (state.isDirectory()) {
    return EFileType.FOLDER;
  } else if (state.isFile()) {
    return EFileType.FILE;
  }

  return undefined;
};

/** 获取文件所在的文件夹 */
export const getFileChannelPath = (file: IFileListItem) => {
  return dirname(file.path);
};

/** 获取文件的扩展名 */
export const getFileExtension = (file: IFileListItem) => {
  return extname(file.path);
};
