<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useControlConfigStore from '@/render/store/useControlConfigStore'

const controlConfigStore = useControlConfigStore()

const { config } = storeToRefs(controlConfigStore)

const fileNameForm = computed(() => config.value.entirety)
</script>

<template>
  <div class="easy-rename-action-bars-entirety">
    <el-form :model="fileNameForm" size="small" inline>
      <el-form-item label="文件名">
        <el-radio-group v-model="fileNameForm.fileNameOpertaionType">
          <el-radio label="文件名改成大写" />
          <el-radio label="文件名改成小写" />
          <el-radio label="文件名首字母大写" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文件名替换为">
        <el-input v-model="fileNameForm.fileNameReplaceText" clearable />
      </el-form-item>
    </el-form>

    <el-form :model="fileNameForm" size="small" inline>
      <el-form-item label="扩展名">
        <el-radio-group v-model="fileNameForm.extensionNameOpertaionType">
          <el-radio label="扩展名改成大写" />
          <el-radio label="扩展名改成小写" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="扩展名替换为">
        <el-input v-model="fileNameForm.extensionNameReplaceText" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.easy-rename-action-bars-entirety {
}
</style>
