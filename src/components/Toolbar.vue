<script setup lang="ts">
// import * as remote from "electron"

// const { dialog } = remote

/** 添加文件 */
const handleAddFile = () => {
  console.log('handleAddFile')

  // dialog.showOpenDialog({ title: '选择图片', filters: [{ name: 'image', extensions: ['jpg', 'png'] }] })
  //           .then(res => {
  //             console.log(res)

  //           })
  //           .catch(console.log)
}
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
      <div
        title="预览 Ctrl+F"
        class="easy-rename-toolbas-item"
      >
        <el-icon><Search /></el-icon>
      </div>
      <div
        title="应用 Ctrl+E"
        class="easy-rename-toolbas-item"
      >
        <el-icon><Finished /></el-icon>
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
      background-color: rgba(0, 0, 0, .1);
    }
  }
}
</style>
