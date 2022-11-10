import useFileListStore from "../store/useFileListStore";

export const handleClearFileList = () => {
    console.log('render handleClearFileList')
    const fileListStore = useFileListStore();

    fileListStore.clear();
}

export const handleDelectSelectItem = () => {
    console.log('handleDelectSelectItem')
}