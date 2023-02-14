import { Ref, ref } from "vue";
import { defineStore } from "pinia";
import { ElTable } from "element-plus";
import { IFileListItem } from "@/types";
import { getFileExtension, getFileChannelPath, getFileType } from "@/utils";

const useFileListStore = defineStore("fileList", () => {
  // 文件列表
  const filesList: Ref<IFileListItem[]> = ref([]);
  // 表格中选中的文件的路径
  const selectionFiles = ref<IFileListItem[]>([]);
  // 表格组件的 ref 引用
  const multipleTableRef = ref<InstanceType<typeof ElTable>>();

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
    } as IFileListItem;
  };

  const add = (addList: IFileListItem[]) => {
    console.log(addList);
    addList = addList.map(initFileInfo);
    filesList.value = [...filesList.value, ...addList];
  };

  const replace = (list: IFileListItem[]) => {
    filesList.value = list.map(initFileInfo);
  };

  const clear = () => {
    filesList.value = [];
  };

  const setSelectionFiles = (list: IFileListItem[]) => {
    selectionFiles.value = list;
  };

  /** 设置 ref */
  const setMultipleTableRef = (ref: any) => {
    multipleTableRef.value = ref;
  };

  /** 去除选中的列表项 */
  const cancleSelection = () => {
    filesList.value = filesList.value.filter(
      (item) =>
        selectionFiles.value.findIndex(
          (selectItem) => selectItem.path === item.path
        ) === -1
    );
  };

  /** 全选 */
  const selectionAll = () => {
    if (selectionFiles.value.length !== filesList.value.length) {
      multipleTableRef.value?.toggleAllSelection();
    }
  };

  /** 全不选 */
  const cancleSelectionAll = () => {
    selectionFiles.value.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, false);
    });
  };
  
  /** 选中 */
  const selectItem = () => {
    // @ts-ignore
    multipleTableRef.value?.setCurrentRow()

    const currentItem = document.querySelector('.el-table .el-table__row:hover')
    const parent = currentItem?.parentNode
    // TODO: 还没有做完，有BUG，偶尔会异常
    const index = Array.from(parent?.children??[]).findIndex(item => currentItem === item)
    console.log('index', index)

    multipleTableRef.value!.toggleRowSelection(filesList.value[index], true);
  };

  /** 不选中 */
  const cancleSelectItem = () => {
    // @ts-ignore
    multipleTableRef.value?.setCurrentRow()

    const currentItem = document.querySelector('.el-table .el-table__row:hover')
    const parent = currentItem?.parentNode
    // TODO: 还没有做完，有BUG，偶尔会异常
    const index = Array.from(parent?.children??[]).findIndex(item => currentItem === item)
    console.log('index', index)

    multipleTableRef.value!.toggleRowSelection(filesList.value[index], false);
  };

  return {
    filesList,
    selectionFiles,
    add,
    replace,
    clear,
    setSelectionFiles,
    cancleSelection,
    setMultipleTableRef,
    selectionAll,
    cancleSelectionAll,
    selectItem,
    cancleSelectItem,
  };
});

export default useFileListStore;
