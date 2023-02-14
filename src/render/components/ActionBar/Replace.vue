<template>
  <div class="easy-rename-action-bars-replace">
    <el-space direction="vertical" alignment="flex-start">
      <el-form :model="formValue" size="small" inline>
        <el-form-item label="把文件名中的">
          <el-space>
            <el-input v-model="formValue.originText"></el-input>
            <el-tooltip content="可以输入正则表达式">
              <el-icon :size="16" color="#409eff"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-space>
        </el-form-item>
        <el-form-item label="替换成">
          <el-input v-model="formValue.replaceText"></el-input>
        </el-form-item>
      </el-form>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import useFileListStore from "@/render/store/useFileListStore";

const filesListStore = useFileListStore();

const formValue = reactive({
  originText: "",
  replaceText: "",
});

watch(
  () => formValue,
  (newValue) => {
    const temp = filesListStore.filesList.map((item) => {
      let previewExtension = item.extension;
      let previewName = item.name.substring(
        0,
        item.name.length - (item.extension?.length ?? 0)
      );
      previewName = previewName.replaceAll(
        new RegExp(newValue.originText),
        newValue.replaceText
      );

      return {
        ...item,
        previewName,
        previewExtension,
      };
    });
    console.log("temp", temp);
    filesListStore.replace(temp);
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.easy-rename-action-bars-replace {
  font-size: 14px;
}
</style>
