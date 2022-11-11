import useFileListStore from "../store/useFileListStore";

export const handleClearFileList = () => {
    console.log('render handleClearFileList')
    const fileListStore = useFileListStore();

    fileListStore.clear();
}

export const handleDelectSelectItem = () => {
    console.log('handleDelectSelectItem')
}

/** 文件列表右键菜单 全选 */
export const handleFileListSelectedAll = () => {
    console.log('handleFileListSelectedAll')
    const fileListStore = useFileListStore();

    fileListStore.selectionAll()
}

/** 文件列表右键菜单 全不选 */
export const handleFileListCancleAll = () => {
    console.log('handleFileListCancleAll')
    const fileListStore = useFileListStore();

    fileListStore.cancleSelectionAll()
}

/** 文件列表右键菜单 去除选中的列表项 */
export const handleFileListFilter = () => {
    console.log('handleFileListFilter')
    const fileListStore = useFileListStore();

    fileListStore.cancleSelection()
}

/** 文件列表右键菜单 选中 */
export const handleFileListSelected = () => {
    console.log('handleFileListSelected')
    const fileListStore = useFileListStore();

    fileListStore.selectItem()
}
/** 文件列表右键菜单 取消选中 */
export const handleFileListCancleSelected = () => {
    console.log('handleFileListCancleSelected')
    const fileListStore = useFileListStore();

    fileListStore.cancleSelectItem()
}