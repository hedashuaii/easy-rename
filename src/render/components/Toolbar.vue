<script setup lang="ts">
import { ipcRenderer } from "electron";
import { ElNotification } from "element-plus";
import useFileListStore from "../store/useFileListStore";
import { getFileExtension, getFileChannelPath, getFileType } from "@/utils";
import path from "path";

const fileListStore = useFileListStore();

/** 添加文件 */
const handleAddFile = () => {
  ipcRenderer.invoke("selectFile").then((res) => {
    fileListStore.add(res);
  });
};

/** 清空文件列表 */
const handleClearFile = () => {
  fileListStore.clear();
};

const handleRenameFile = () => {
  const renameFiles = fileListStore.filesList.filter(
    (item) => !!item.previewName
  );
  /**
   * electron 中用 IPC 通信的时候似乎不能处理 Prxoy 代理的值，所以把它转一下
   *
   *  Uncaught (in promise) Error: An object could not be cloned.
   *    at o.invoke (node:electron/js2c/renderer_init:57:500)
   *    at handleRenameFile (Toolbar.vue:33:15)
   *    at callWithErrorHandling (runtime-core.esm-bundler.js:155:22)
   *    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:164:21)
   *    at HTMLDivElement.invoker (runtime-dom.esm-bundler.js:339:9)
   *
   */
  const parseRenameFiles = JSON.parse(JSON.stringify(renameFiles));

  if (!parseRenameFiles.length) return;

  ipcRenderer.invoke("renameFile", parseRenameFiles).then((res) => {
    console.log("res", res);

    const allSuccessFlag = res.map(
      (item: PromiseSettledResult<any>) => item.status === "fulfilled"
    );

    if (!allSuccessFlag) {
      ElNotification({
        title: "错误提示",
        message: "文件重命名可能存在错误！请注意！",
        type: "error",
      });
    }

    // TODO: 处理文件的结果显示到列表中
    res.forEach((item: PromiseSettledResult<any>) => {
      const file =
        item.status === "fulfilled" ? item.value.file : item.reason.file;

      // 找到在重命名前的下标，因为重命名数组是被上面过滤过的
      const origin = fileListStore.filesList.find(
        (endItme) => endItme.path === file.path
      )!;

      origin.result = item.status === "fulfilled";
      origin.path = file.newName;
      origin.extension = getFileExtension(file.newName);
      origin.channelPath = getFileChannelPath(file.newName);
      origin.fileType = getFileType(file.newName);
      origin.name = path.basename(file.newName);
    });

    console.log("fileListStore.filesList", fileListStore.filesList);
  });
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
      <div
        title="应用 Ctrl+E"
        class="easy-rename-toolbas-item"
        @click="handleRenameFile"
      >
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
