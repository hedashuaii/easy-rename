<template>
  <div :class="`${classPrefix}`">
    <el-form :model="form" size="small" inline>
      <el-form-item label="预设方案">
        <el-select
          v-model="form.extends"
          clearable
          filterable
          size="small"
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择或输入一个序号模板"
        >
          <el-option v-for="item in presetSchemeList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { pinyin } from "pinyin-pro";
import { reactive, watch } from "vue";
import { EExtendPresetScheme } from "@/types";
import { ElForm, ElFormItem, ElSelect } from "element-plus";
import useFileListStore from "@/render/store/useFileListStore";

const classPrefix = "easy-rename-action-bar-extend";

const presetSchemeList = [
  EExtendPresetScheme.ConversionOfChineseCharactersToPinyin,
  EExtendPresetScheme.ConversionOfChineseCharactersToPinyinCapitalized,
];

const form = reactive({
  extends: "",
});

const filesListStore = useFileListStore();

watch(
  form,
  () => {
    const temp = filesListStore.filesList.map((item) => {
      const previewExtension = item.extension;
      // 去除文件扩展名
      let previewName = item.name.substring(
        0,
        item.name.length - (item.extension?.length ?? 0)
      );

      switch (form.extends as unknown as EExtendPresetScheme) {
        case EExtendPresetScheme.ConversionOfChineseCharactersToPinyin:
            previewName = pinyin(previewName, { toneType: "none", type: "array" }).join('')
            break;
        case EExtendPresetScheme.ConversionOfChineseCharactersToPinyinCapitalized:
            previewName = pinyin(previewName, { toneType: "none", type: "all" })
                .map(item => {
                    if(!item.isZh) return item.origin

                    // 首字母大写
                    return item.pinyin.charAt(0).toUpperCase() + item.pinyin.slice(1)
                })
                .join('')
            break;
        default:
            break;
      }

      return {
        ...item,
        previewName,
        previewExtension,
      };
    });

    filesListStore.replace(temp)
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.easy-rename-action-bar-extend {
}
</style>
