import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { IControlConfig, ERemoveType, ESerialOptions } from '@/types'


const useControlConfig = defineStore('useControlConfig', () => {
  const config = reactive<IControlConfig>({
    entirety: {
      /** 文件名操作类型 */
      fileNameOpertaionType: '',
      /** 文件名被替换的字符 */
      fileNameReplaceText: '',
      /** 扩展名操作类型 */
      extensionNameOpertaionType: '',
      /** 扩展名被替换的字符 */
      extensionNameReplaceText: '',
    },
    replace: {
      originText: '',
      replaceText: '',
    },
    serial: {
      /** 序号模板 */
      template: '',
      /** 开始编号 */
      start: 1,
      /** 增量 */
      deep: 1,
      /** 位数 */
      length: 2,
      /** 选项 */
      options: [ESerialOptions.INSUFFICIENT_POSITION_TO_MAKE_UP],
    },
    append: {
      prepend: '',
      append: '',
      insert: '',
      insertIndex: 1,
    },
    remove: {
      deleteType: ERemoveType.CONTENT,
      startIndex: 1,
      deleteLength: 1,
      deleteString: '',
    },
    extend: {
      extends: undefined,
    },
  })

  return {
    config,
  }
})

export default useControlConfig
