<script setup lang="ts">
import Toolbar from './components/Toolbar.vue'
import ActionBar from './components/ActionBar.vue'
import FileList from './components/FileList.vue'
</script>

<template>
<div class="easy-rename">
  <Toolbar />
  <ActionBar />
  <FileList />
</div>
</template>

<style scoped>
.easy-rename {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
