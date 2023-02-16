<template>
  <div :class="`${prefix}`">
    <el-form :form="form" size="small" inline>
      <el-form-item label="文件名前添加">
        <el-input v-model="form.prepend" />
      </el-form-item>
      <el-form-item label="文件名后添加">
        <el-input v-model="form.append" />
      </el-form-item>
      <el-form-item label="文件名中添加">
        <el-space>
          从文件名第
          <el-input-number
            v-model="form.insertIndex"
            controls-position="right"
            :min="-255"
            :max="255"
          />
          个字符开始添加字符串
          <el-input v-model="form.insert" />
          <el-tooltip content="对于超出文件名长度的会进行取模运算后再添加">
            <el-icon :size="16" color="#409eff"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-space>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import useFileListStore from "@/render/store/useFileListStore";
import {
  ElForm,
  ElIcon,
  ElSpace,
  ElInput,
  ElTooltip,
  ElFormItem,
  ElInputNumber,
} from "element-plus";

const prefix = "easy-rename-action-bars-append";

const form = reactive({
  prepend: "",
  append: "",
  insert: "",
  insertIndex: 1,
});

const filesListStore = useFileListStore();

watch(
  () => form,
  () => {
    const temp = filesListStore.filesList.map((item) => {
      const previewExtension = item.extension;
      // 去除文件扩展名
      let previewName = item.name.substring(
        0,
        item.name.length - (item.extension?.length ?? 0)
      );

      // 对长度进行取模运算，防止插入的下标超出文件名长度
      let insertIndexRight = form.insertIndex % previewName.length;

      if (form.insertIndex < 0) {
        // 插入下标小于零时，即倒数第几位开始插入
        insertIndexRight = previewName.length + insertIndexRight;
      } else {
        insertIndexRight = form.insertIndex % previewName.length;
      }

      // 根据插入下标，切割文件名
      const prefix = previewName.slice(0, insertIndexRight);
      const suffix = previewName.slice(insertIndexRight);

      // 拼装文件名
      previewName = `${form.prepend}${prefix}${form.insert}${suffix}${form.append}`;

      return {
        ...item,
        previewName,
        previewExtension,
      };
    });

    filesListStore.replace(temp);
  },
  { deep: true }
);
</script>

<style scoped lang="scss"></style>
