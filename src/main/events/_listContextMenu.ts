import { Menu, BrowserWindow } from "electron";
import { IHandle } from "./types";

const handleListContextMenu: IHandle = async (e) => {
  const menuTemplate = [
    {
      label: "清空列表",
      click: () => {
        e.sender.send("handleClearFileList");
      },
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);

  // @ts-ignore
  menu.popup(BrowserWindow.fromWebContents(e.sender));
};

export default {
  type: "on",
  callback: handleListContextMenu,
};
