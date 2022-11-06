import { IFileListItem } from "../../types";
import fs from "fs";
import path from "path";
import { IHandle } from './types'
import { dialog } from "electron";

const handleSelectFile: IHandle = async (e, ...args) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: "选择文件",
      properties: ["openFile", "multiSelections", "showHiddenFiles"],
    });
  
    if (!canceled) {
      const files: IFileListItem[] = filePaths.map((filePath) => {
        // 获取文件的基本信息
        const state = fs.statSync(filePath);
  
        return {
          lastModified: state.mtime.valueOf(),
          name: path.basename(filePath),
          size: state.size,
          webkitRelativePath: "",
          type: "",
          path: filePath,
        };
      });
      return files;
    }
  };

  export default handleSelectFile