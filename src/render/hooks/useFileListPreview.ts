import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { IFileListItem, IControlConfig } from '@/types'
import useFileListStore from '@/render/store/useFileListStore';
import useControlConfigStore from '@/render/store/useControlConfigStore';
import { bytesToUpperCase, bytesToLowerCase, stringToCapitalize } from '@/utils/replace'

const useFileListPreview = () => {
  const fileListStore = useFileListStore();
  const controlConfigStore = useControlConfigStore()
  const { config } = storeToRefs(controlConfigStore)

  /**
   * “整体”选项卡逻辑的处理
   * @param item 当前处理的文件
   * @param entiretyConfig 处理的配置
   */
  const dealEntirety = (item: IFileListItem, entiretyConfig: IControlConfig['entirety']) => {
    if (entiretyConfig.fileNameReplaceText) {
      item.previewName = entiretyConfig.fileNameReplaceText
    } else if (entiretyConfig.fileNameOpertaionType) {
      const fileName = item.name.replace(new RegExp(`${item.extension}$`), '')
      switch (entiretyConfig.fileNameOpertaionType) {
        case '文件名改成大写':
          item.previewName = bytesToUpperCase(fileName)
          break
        case '文件名改成小写':
          item.previewName = bytesToLowerCase(fileName)
          break
        case '文件名首字母大写':
          item.previewName = stringToCapitalize(fileName)
          break
      }
    }

    if (entiretyConfig.extensionNameReplaceText) {
      item.previewExtension = '.' + entiretyConfig.extensionNameReplaceText
    } else if (entiretyConfig.extensionNameOpertaionType) {
      switch (entiretyConfig.extensionNameOpertaionType) {
        case '扩展名改成大写':
          item.previewExtension = bytesToUpperCase(item.extension ?? '')
          break
        case '扩展名改成小写':
          item.previewExtension = bytesToLowerCase(item.extension ?? '')
          break
      }
    }
  }

  watch(config, () => {

    const temp = fileListStore.filesList.map(item => {
      item.previewName = item.name
      item.previewExtension = item.extension

      dealEntirety(item, config.value.entirety)

      return { ...item }
    })

    fileListStore.filesList = temp

  }, {deep: true})
}

export default useFileListPreview
