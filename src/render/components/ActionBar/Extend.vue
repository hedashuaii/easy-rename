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
          <el-option
            v-for="item in presetSchemeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { pinyin } from "pinyin-pro";
import { ElForm, ElFormItem, ElSelect } from "element-plus";
import useFileListStore from "@/render/store/useFileListStore";

const classPrefix = "easy-rename-action-bar-extend";

enum EPresetSchemeList {
  /** 汉字转换为拼音 */
  ConversionOfChineseCharactersToPinyin,
  /** 汉字转换为拼音且首字母大写 */
  ConversionOfChineseCharactersToPinyinCapitalized,
}

const presetSchemeList = [
  {
    label: "汉字转换为拼音",
    value: EPresetSchemeList.ConversionOfChineseCharactersToPinyin,
  },
  {
    label: "汉字转换为拼音且首字母大写",
    value: EPresetSchemeList.ConversionOfChineseCharactersToPinyinCapitalized,
  },
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

      switch (form.extends as unknown as EPresetSchemeList) {
        case EPresetSchemeList.ConversionOfChineseCharactersToPinyin:
            previewName = pinyin(previewName, { toneType: "none", type: "array" }).join('')
            break;
        case EPresetSchemeList.ConversionOfChineseCharactersToPinyinCapitalized:
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
