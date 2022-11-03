<script setup lang="ts">
import dayjs from "dayjs";
import { reactive } from "vue";
import { filesize } from "filesize";
import { IFileListItem, EFileType } from "../types";
import { getFileType, getFileChannelPath, getFileExtension } from "../utils";

const tableData = reactive<IFileListItem[]>([]);

const handleDrop = (e: DragEvent) => {
  console.log(e.dataTransfer?.files);
  e.preventDefault();
  e.stopPropagation();

  const files = Array.from(e.dataTransfer?.files ?? []).map((item) => {
    const { lastModified, name, size, webkitRelativePath, type, path } = item;

    const channelPath = getFileChannelPath(item);

    const extension = getFileExtension(item);

    // TODO: 后期考虑用 node 的 fs.state 来判断是文件还文件夹
    const fileType = getFileType(item);

    // 组装新数据
    return {
      lastModified,
      name,
      size,
      webkitRelativePath,
      type,
      path,
      channelPath,
      extension,
      fileType,
    } as any;
  });

  files.forEach((item) => tableData.push(item));
};
</script>

<template>
  <div
    @drop="handleDrop"
    @dragover="(e) => e.preventDefault()"
    class="easy-rename-file-list"
  >
    <el-table
      border
      stripe
      size="small"
      :data="tableData"
      class="easy-rename-file-list-table"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="preview" label="预览" />
      <el-table-column prop="extension" label="扩展名" />
      <el-table-column prop="lastModifiedDate" label="修改日期">
        <template #default="scope">
          <span>{{
            dayjs(scope.row.lastModified).format("YYYY-MM-DD HH:mm")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="channelPath" label="路径">
        <template #default="scope">
          <span>{{ scope.row.channelPath }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="size" label="大小" align="right">
        <template #default="scope">
          <span>{{
            scope.row.fileType === EFileType.FILE
              ? filesize(scope.row.size, { round: 0 })
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileType" label="识别类型" />
      <el-table-column prop="result" label="结果" />
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
