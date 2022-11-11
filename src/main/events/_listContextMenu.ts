import { Menu, BrowserWindow, MenuItemConstructorOptions } from "electron";
import { IHandle } from "./types";

const handleListContextMenu: IHandle = async (e) => {
  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: "清空列表",
      click: () => {
        e.sender.send("handleClearFileList");
      },
    },
    { type: "separator" },
    {
      label: "选中",
      click: () => {
        e.sender.send("handleFileListSelected")
      },
    },
    {
      label: "取消选中",
      click: () => {
        e.sender.send("handleFileListCancleSelected")
      },
    },
    {
      label: "全选",
      click: () => {
        e.sender.send("handleFileListSelectedAll")
      },
    },
    {
      label: "全不选",
      click: () => {
        e.sender.send("handleFileListCancleAll")
      },
    },
    { type: "separator" },
    {
      label: "去除选中的列表项",
      click: () => {
        e.sender.send("handleFileListFilter")
      },
    },
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)

  // @ts-ignore
  menu.popup(BrowserWindow.fromWebContents(e.sender))
};

export default {
  type: "on",
  callback: handleListContextMenu,
}
