<template>
    <div v-if="!isProduction" class="">
        <el-button @click="logFileList">FileList</el-button>
        <el-button @click="logConfig">ControlConfig</el-button>
    </div>
</template>

<script setup lang="ts">
import useFileListStore from "../store/useFileListStore";
import useControlConfig from "../store/useControlConfigStore";

const isProduction = import.meta.env.MODE === 'production'

const fileListStore = useFileListStore();
const controlConfig = useControlConfig();

const logFileList = () => console.log(fileListStore.filesList)
const logConfig = () => console.log(controlConfig.config)
</script>

<style scoped lang="scss"></style>
