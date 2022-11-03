<script setup lang="ts">
  import Entirety from "./Entirety.vue";
</script>

<template>
  <div class="easy-rename-action-bars">
    <el-tabs type="card">
      <el-tab-pane label="整体">
        <Entirety />
      </el-tab-pane>
      <el-tab-pane label="替换">替换</el-tab-pane>
      <el-tab-pane label="序号">序号</el-tab-pane>
      <el-tab-pane label="添加">添加</el-tab-pane>
      <el-tab-pane label="删除">删除</el-tab-pane>
      <el-tab-pane label="扩展更名">扩展更名</el-tab-pane>
      <el-tab-pane label="标签命名">标签命名</el-tab-pane>
      <el-tab-pane label="标签写入">标签写入</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.easy-rename-action-bars {
}
</style>
