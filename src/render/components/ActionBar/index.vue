<template>
  <div class="easy-rename-action-bars">
    <el-tabs type="card">
      <el-tab-pane label="添加"><Append /></el-tab-pane>
      <el-tab-pane label="整体"><Entirety /></el-tab-pane>
      <el-tab-pane label="替换"><Replace /></el-tab-pane>
      <el-tab-pane label="序号"><Serial /></el-tab-pane>
      <el-tab-pane label="删除">删除</el-tab-pane>
      <el-tab-pane label="扩展更名">扩展更名</el-tab-pane>
      <el-tab-pane label="标签命名">标签命名</el-tab-pane>
      <el-tab-pane label="标签写入">标签写入</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import Entirety from "./Entirety.vue";
  import Replace from "./Replace.vue";
  import Serial from "./Serial.vue";
  import Append from "./Append.vue";
</script>

<style lang="scss" scoped>
.easy-rename-action-bars {
  :deep(.el-tab-pane) {
    min-height: 84px;
  }

  :deep(.el-input-number.is-controls-right .el-input__wrapper) {
    padding-left: 10px;
    padding-right: 37px;
  }

  :deep(.el-input-number--small) {
    width: 70px;
  }
}
</style>
