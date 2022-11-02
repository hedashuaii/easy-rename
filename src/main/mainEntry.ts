import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";

// ELECTRON_DISABLE_SECURITY_WARNINGS 用于设置渲染进程开发者调试工具的警告，这里设置为 true 就不会再显示任何警告了。
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  const config = {
    webPreferences: {
      // 把 Node.js 环境集成到渲染进程中
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      // 在同一个 JavaScript 上下文中使用 Electron API
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };

  mainWindow = new BrowserWindow(config);

  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);

    // 主渲染窗口打开 F12调试功能
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }
});
