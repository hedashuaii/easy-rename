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
            <el-option
              v-for="item in templateList"
              :key="item"
              :label="item"
              :value="item"
            />
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
      <div></div>
      <el-form-item label="起始于">
        <el-input-number
          size="small"
          v-model="form.start"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="增量">
        <el-input-number
          size="small"
          v-model="form.deep"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <!-- <div></div> -->
      <el-form-item label="位数">
        <el-input-number
          size="small"
          v-model="form.length"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="form.options">
          <el-checkbox v-for="item in optionsList" :label="item.value" :key="item.value" name="options">{{ item.text }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import useFileListStore from "@/render/store/useFileListStore";
import { ESerialOptions } from "@/types"

const optionsList = [
  {text: '不足位补齐', value: ESerialOptions.INSUFFICIENT_POSITION_TO_MAKE_UP},
  // {text: '小字字母编号', value: ESerialOptions.SMALL_LETTER_NUMBER},
  // {text: '大写字母编号', value: ESerialOptions.CAPITAL_LETTER_NUMBER},
]
const filesListStore = useFileListStore();
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
  options: [ESerialOptions.INSUFFICIENT_POSITION_TO_MAKE_UP] as ESerialOptions[],
});

watch(
  form,
  () => {
    let serial = form.start
    
    const temp = filesListStore.filesList.map((item) => {
      let previewName = item.name.substring(0, item.name.length - (item.extension?.length ?? 0));
      let tempSerial = serial.toString()

      // 不足位补零
      if(form.options.includes(ESerialOptions.INSUFFICIENT_POSITION_TO_MAKE_UP)) {
        tempSerial = tempSerial.padStart(form.length, "0") 
      }
      
      // 替换字符模板
      let template = form.template.valueOf() || '#<SELF>'
      
      // 替换模板中的名称
      template = template.replaceAll('<SELF>', previewName)
      
      // 替换序号
      previewName = template.replaceAll('#', tempSerial)

      // 预览名称加上文件后缀
      previewName += item.extension;

      // 序号累加
      serial += form.deep;
      
      return {
        ...item,
        previewName,
      };
    });
    console.log("temp", temp);
    filesListStore.replace(temp);
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.easy-rename-action-bars-serial {
  &-memo {
    font-size: 12px;
    strong {
      color: #409eff;
    }
  }
}
</style>
