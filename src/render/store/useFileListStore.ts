import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { IFileListItem } from "../../types";
import { getFileExtension, getFileChannelPath, getFileType } from "../../utils";

const useFileListStore = defineStore("fileList", () => {
  const filesList: Ref<IFileListItem[]> = ref([]);

  /** 初始化文件信息 */
  const initFileInfo = (file: IFileListItem) => {
    return {
        ...file,
        /** 文件扩展名 */
        extension: getFileExtension(file.path),
        /** 文件所在路径 */
        channelPath: getFileChannelPath(file.path),
        /** 文件类型 */
        fileType: getFileType(file.path),
    } as IFileListItem
  }

  const add = (addList: IFileListItem[]) => {
    console.log(addList)
    addList = addList.map(initFileInfo)
    filesList.value = [...filesList.value, ...addList];
  };

  const replace = (list: IFileListItem[]) => {
    console.log('replace', list.map(initFileInfo))
    filesList.value = list.map(initFileInfo);
  };

  const clear = () => {
    filesList.value = []
  }

  return { filesList, add, replace, clear };
});

export default useFileListStore;
