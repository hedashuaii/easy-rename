<template>
	<div :class="`${classPrefix}`">
		<el-form inline :form="form" size="small">
			<el-form-item>
				<el-radio-group v-model="form.deleteType">
					<el-space>
						<el-radio :label="ERemoveType.CONTENT" />
						<el-form-item>
							<el-space>
								删除文件名中的
								<el-input v-model="form.deleteString" />
							</el-space>
						</el-form-item>
					</el-space>
					<div></div>
					<el-space>
						<el-radio :label="ERemoveType.INTERVAL" />
						<el-form-item>
							<el-space>
								从文件名第
								<el-input-number :min="-255" :max="255" controls-position="right" v-model="form.startIndex" />
								个字符开始，共删除
								<el-input-number :min="1" :max="255" controls-position="right" v-model="form.deleteLength" />
								个字符
							</el-space>
						</el-form-item>
					</el-space>
				</el-radio-group>
			</el-form-item>
			
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { ERemoveType } from '@/types'
import useFileListStore from '@/render/store/useFileListStore';
import { ElForm, ElFormItem, ElInput, ElInputNumber, ElSpace } from "element-plus";

const classPrefix = "easy-rename-action-bars-delete";

const filesListStore = useFileListStore()

const form = reactive({
	deleteType: ERemoveType.CONTENT,
	startIndex: 1,
	deleteLength: 1,
	deleteString: '',
})

watch(form, () => {
	console.log('form', form)
	const temp = filesListStore.filesList.map(item => {
		const previewExtension = item.extension
		// 去除文件扩展名
		let previewName = item.name.substring(
			0,
			item.name.length - (item.extension?.length ?? 0)
		);

		if(form.deleteType === ERemoveType.CONTENT) {
			previewName = previewName.replaceAll(form.deleteString, '')
		} else if(form.deleteType === ERemoveType.INTERVAL) {
			// TODO: 未完成
			// previewName = 
		}

		return {
			...item,
			previewName,
			previewExtension,
		}
	})
}, {deep: true})



</script>

<style scoped lang="scss">
.easy-rename-action-bars-delete {
	color: #606266;

	:deep(.el-radio-group) {
		display: block;
		& > .el-space:last-child {
			margin-top: 18px;
		}
	}
}
</style>