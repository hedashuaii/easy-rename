import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { IFileListItem } from "../../types";
import { getFileExtension, getFileChannelPath, getFileType } from "../../utils";

const useFileListStore = defineStore("fileList", () => {
  // 文件列表
  const filesList: Ref<IFileListItem[]> = ref([]);
  // 表格中选中的文件的路径
  const selectionFiles = ref<IFileListItem[]>([])

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

  const setSelectionFiles = (list: IFileListItem[]) => {
    selectionFiles.value = list
  }

  return { filesList, selectionFiles, add, replace, clear, setSelectionFiles };
});

export default useFileListStore;
