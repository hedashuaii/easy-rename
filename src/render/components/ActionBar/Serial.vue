<template>
  <div class="easy-rename-action-bars-serial">
    <el-form :model="form" size="small" inline>
      <el-form-item label="模板">
        <el-space>
            <el-select
              v-model="form.template"
              clearable
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="请选择或输入一个序号模板"
            >
              <el-option v-for="item in templateList" :key="item" :label="item" :value="item" />
            </el-select>
            <el-popover>
                <template #reference>
                    <el-icon :size="16" color="#409eff"><QuestionFilled /></el-icon>
                </template>

                <div class="easy-rename-action-bars-serial-memo">
                    <p><strong>#</strong> 代表序号</p>
                    <p><strong>&lt;SELF&gt;</strong> 代表文件名</p>
                </div>
            </el-popover>
        </el-space>
      </el-form-item>
      <el-form-item label="起始于">
        <el-input-number size="small" v-model="form.start" controls-position="right" />
      </el-form-item>
      <el-form-item label="增量">
        <el-input-number size="small" v-model="form.deep" :min="1" controls-position="right" />
      </el-form-item>
      <div></div>
      <el-form-item label="位数">
        <el-input-number size="small" v-model="form.length" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="form.options">
            <el-checkbox label="不足位补齐" name="options" />
            <el-checkbox label="小字字母编号" name="options" />
            <el-checkbox label="大写字母编号" name="options" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const templateList = ref(["#-<SELF>", "#.<SELF>", "#_<SELF>"]);

const form = reactive({
  /** 序号模板 */
  template: "",
  /** 开始编号 */
  start: 1,
  /** 增量 */
  deep: 1,
  /** 位数 */
  length: 2,
  /** 选项 */
  options: [],
});
</script>

<style scoped lang="scss">
.easy-rename-action-bars-serial {
    &-memo {
        font-size: 12px;
        strong {
            color: #409eff;
        } 
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
