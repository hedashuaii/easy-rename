<script setup lang="ts">
import { ipcRenderer } from "electron";
import useFileListStore from "../store/useFileListStore";

const fileListStore = useFileListStore();

/** 添加文件 */
const handleAddFile = () => {
  ipcRenderer.invoke("open-file").then((res) => {
    fileListStore.add(res);
  });
};

/** 清空文件列表 */
const handleClearFile = () => {
  fileListStore.clear();
};
</script>

<template>
  <div class="easy-rename-toolbas">
    <el-space>
      <div
        @click="handleAddFile"
        title="添加文件 Ctrl+O"
        class="easy-rename-toolbas-item"
      >
        <el-icon><FolderOpened /></el-icon>
      </div>
      <div title="预览 Ctrl+F" class="easy-rename-toolbas-item">
        <el-icon><Search /></el-icon>
      </div>
      <div title="应用 Ctrl+E" class="easy-rename-toolbas-item">
        <el-icon><Finished /></el-icon>
      </div>
      <div
        @click="handleClearFile"
        title="清空文件列表"
        class="easy-rename-toolbas-item"
      >
        <el-icon><Delete /></el-icon>
      </div>
    </el-space>
  </div>
</template>

<style scoped lang="scss">
.easy-rename-toolbas {
  &-item {
    padding: 4px;

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
