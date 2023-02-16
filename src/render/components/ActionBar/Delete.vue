<template>
	<div :class="`${classPrefix}`">
		<el-form inline :form="form" size="small">
			<el-form-item label="删除文件名中的">
				<el-input v-model="form.deleteString" />
			</el-form-item>
			<el-form-item label="扩展删除">
				<el-space>
					从文件名第
					<el-input-number controls-position="right" v-model="form.startIndex" />
					个字符开始，共删除
					<el-input-number controls-position="right" v-model="form.deleteLength" />
					个字符
				</el-space>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElInputNumber, ElSpace } from "element-plus";

const classPrefix = "easy-rename-action-bars-delete";

const form = reactive({
	startIndex: 1,
	deleteLength: 1,
	deleteString: '',
})

</script>

<style scoped lang="scss">
.easy-rename-action-bars-delete {
	
}
</style>