import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import {
  bytesToUpperCase,
  bytesToLowerCase,
  stringToCapitalize,
} from "../../utils/replace";
import useFileListStore from "./useFileListStore";

export interface IOptions {
  /** 文件名操作类型 */
  fileNameOpertaionType?: string;
  /** 文件名被替换的字符 */
  fileNameReplaceText?: string;
  /** 扩展名操作类型 */
  extensionNameOpertaionType?: string;
  /** 扩展名被替换的字符 */
  extensionNameReplaceText?: string;
}

export default defineStore("options", () => {
  const options = reactive<IOptions>({
    /** 文件名操作类型 */
    fileNameOpertaionType: "",
    /** 文件名被替换的字符 */
    fileNameReplaceText: "",
    /** 扩展名操作类型 */
    extensionNameOpertaionType: "",
    /** 扩展名被替换的字符 */
    extensionNameReplaceText: "",
  });

  const setFieldsValue = (obj: IOptions) => {
    // @ts-ignore
    Object.keys(obj).forEach((key) => (options[key] = obj[key]));
  };

  const filesListStore = useFileListStore();

  watch(
    () => options,
    (newValue) => {
      const temp = filesListStore.filesList.map((item) => {
        let previewName = item.name;
        let previewExtension = item.extension;

        if (newValue.fileNameReplaceText) {
          previewName = newValue.fileNameReplaceText;
        } else if (newValue.fileNameOpertaionType) {
          const fileName = item.name.replace(
            new RegExp(`${item.extension}$`),
            ""
          );
          switch (newValue.fileNameOpertaionType) {
            case "文件名改成大写":
              previewName = bytesToUpperCase(fileName);
              break;
            case "文件名改成小写":
              previewName = bytesToLowerCase(fileName);
              break;
            case "文件名首字母大写":
              previewName = stringToCapitalize(fileName);
              break;
          }
        }

        if (newValue.extensionNameReplaceText) {
          previewExtension = "." + newValue.extensionNameReplaceText;
        } else if (newValue.extensionNameOpertaionType) {
          switch (newValue.extensionNameOpertaionType) {
            case "扩展名改成大写":
              previewExtension = bytesToUpperCase(item.extension ?? "");
              break;
            case "扩展名改成小写":
              previewExtension = bytesToLowerCase(item.extension ?? "");
              break;
          }
        }

        return {
          ...item,
          previewName: previewName,
          previewExtension: previewExtension,
        };
      });

      filesListStore.replace(temp);
    },
    { deep: true }
  );

  return { options, setFieldsValue };
});
