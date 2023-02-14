import fs from "fs";
import { IFileListItem } from "@/types";
import { IHandle } from "./types";

const handleRenameFile: IHandle = async (e, files: IFileListItem[]) => {
  console.log("handleRenameFile files", files);

  const filesRenamePromiseMap = files.map((item) => {
    return new Promise((resolve, reject) => {
      const newName = `${item.channelPath}\\${item.previewName}${item.previewExtension}`;
      const newItem = {...item, newName}
      const callback: fs.NoParamCallback = (err) => err ? reject({ file: newItem, err }) : resolve({ file: newItem });

      fs.rename(item.path, newName, callback);
    });
  });

  return Promise.allSettled(filesRenamePromiseMap);
};

export default {
  type: 'handle',
  callback: handleRenameFile
};
