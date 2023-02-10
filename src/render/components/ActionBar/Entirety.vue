<script setup lang="ts">
import { reactive, watch } from "vue";
import {
  bytesToUpperCase,
  bytesToLowerCase,
  stringToCapitalize,
} from "../../../utils/replace";
import useFileListStore from "../../store/useFileListStore";

const fileNameForm = reactive({
  /** 文件名操作类型 */
  fileNameOpertaionType: "",
  /** 文件名被替换的字符 */
  fileNameReplaceText: "",
  /** 扩展名操作类型 */
  extensionNameOpertaionType: "",
  /** 扩展名被替换的字符 */
  extensionNameReplaceText: "",
});

const filesListStore = useFileListStore();

watch(
  () => fileNameForm,
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
</script>

<template>
  <div class="easy-rename-action-bars-entirety">
    <el-form :model="fileNameForm" size="small" inline>
      <el-form-item label="文件名">
        <el-radio-group v-model="fileNameForm.fileNameOpertaionType">
          <el-radio label="文件名改成大写" />
          <el-radio label="文件名改成小写" />
          <el-radio label="文件名首字母大写" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文件名替换为">
        <el-input v-model="fileNameForm.fileNameReplaceText" clearable />
      </el-form-item>
    </el-form>

    <el-form :model="fileNameForm" size="small" inline>
      <el-form-item label="扩展名">
        <el-radio-group v-model="fileNameForm.extensionNameOpertaionType">
          <el-radio label="扩展名改成大写" />
          <el-radio label="扩展名改成小写" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="扩展名替换为">
        <el-input v-model="fileNameForm.extensionNameReplaceText" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.easy-rename-action-bars-entirety {
}
</style>
