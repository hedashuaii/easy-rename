<script setup lang="ts">
import dayjs from "dayjs";
import { ipcRenderer } from "electron";
import { filesize } from "filesize";
import { ref } from "vue";
import { IFileListItem, EFileType } from "@/types";
import useFileListStore from "../store/useFileListStore";

const fileListStore = useFileListStore();

// 监听文件拖曳到列表区域
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const files: IFileListItem[] = Array.from(e.dataTransfer?.files ?? []).map(
    (item) => {
      const { lastModified, name, size, webkitRelativePath, type, path } = item;
      return { lastModified, name, size, webkitRelativePath, type, path };
    }
  );

  console.log("files", files);
  fileListStore.add(files);
};

// 列表区域的右键菜单
const handleContextmenu = (e: MouseEvent) => {
  e.preventDefault()
  // 触发主进程事件，显示右键菜单
  ipcRenderer.send('listContextMenu')
}

const handleSelectionChange = (val: IFileListItem[]) => {
  fileListStore.setSelectionFiles(val)
}

</script>

<template>
  <div
    @drop="handleDrop"
    @dragover="(e) => e.preventDefault()"
    @contextmenu="handleContextmenu"
    class="easy-rename-file-list"
  >
    <el-table
      border
      stripe
      size="small"
      :ref="fileListStore.setMultipleTableRef"
      :data="fileListStore.filesList"
      class="easy-rename-file-list-table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column show-overflow-tooltip type="index" label="序号" width="50" align="center" />
      <el-table-column show-overflow-tooltip prop="name" label="文件名" />
      <el-table-column show-overflow-tooltip prop="preview" label="预览">
        <template #default="scope">
          <span>{{
            (scope.row.previewName ?? "") + (scope.row.previewExtension ?? "")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="extension" label="扩展名" width="60" />
      <el-table-column show-overflow-tooltip prop="lastModifiedDate" label="修改日期">
        <template #default="scope">
          <span>{{
            dayjs(scope.row.lastModified).format("YYYY-MM-DD HH:mm")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="channelPath" label="路径">
        <template #default="scope">
          <span>{{ scope.row.channelPath }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip prop="size" label="大小" align="right">
        <template #default="scope">
          <span>{{
            scope.row.fileType === EFileType.FILE
              ? filesize(scope.row.size, { round: 0 })
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="fileType" label="识别类型" width="60" />
      <el-table-column prop="result" label="结果" width="60">
        <template #default="scope">
          <el-tag v-if="scope.row.result === true" type="success">成功</el-tag>
          <el-tag v-else-if="scope.row.result === false" type="danger">失败</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.easy-rename-file-list {
  flex: 1;
  overflow: hidden;

  &-table {
    width: 100%;
    height: 100%;
  }

  :deep(.el-table .cell) {
    word-break: normal;
    height: 23px;
  }
}
</style>
