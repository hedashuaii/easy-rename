<template>
    <div class="">
        <el-button @click="logFileList">FileList</el-button>
    </div>
</template>

<script setup lang="ts">
import useFileListStore from "../store/useFileListStore";

const fileListStore = useFileListStore();

const logFileList = () => console.log(fileListStore.filesList)
</script>

<style scoped lang="scss"></style>