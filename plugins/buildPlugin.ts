import path from "path";
import fs from "fs";
import { buildElectronFiles } from "./utils";

class BuildObj {
  // 编译主进程代码
  buildMain() {
    buildElectronFiles(true)
  }

  // 为生产环境准备package.json
  preparePackageJson() {
    // 获取当前项目的 package.json 文件的内容
    const pkgJsonPath = path.join(process.cwd(), "package.json");
    // 读取当前项目的 package.json 文件的内容
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    // 获取 Electron 的版本，如果 Electron 的版本号前面有"^"符号的话，需把它删掉
    const electronConfig = localPkgJson.devDependencies.electron.replace("^", "");
    // Electron 构建时生成的 package.json 的路径
    const tarJsonPath = path.join(process.cwd(), "dist", "package.json");

    localPkgJson.main = "mainEntry.js";
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    localPkgJson.devDependencies = { electron: electronConfig };

    // 将新的 package.json 的内容写入到文件
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));

    // 生成完 package.json 文件之后，还创建了一个 node_modules 目录。此举是为了阻止 electron-builder 的一些默认行为（它会阻止electron-builder为我们创建一些没用的目录或文件）
    fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"));
  }

  // 使用 electron-builder 制成安装包
  buildInstaller() {
    const options = {
      config: {
        directories: {
          output: path.join(process.cwd(), "release"),
          app: path.join(process.cwd(), "dist"),
        },
        files: ["**"],
        extends: null,
        productName: "EasyRename",
        appId: "com.easyrename.desktop",
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: "EasyRenameDesktop",
        },
        publish: [{ provider: "generic", url: "http://localhost:5500/" }],
      },
      project: process.cwd(),
    };
    return require("electron-builder").build(options);
  }
}

export const buildPlugin = () => {
  return {
    name: "build-plugin",
    closeBundle: () => {
      const buildObj = new BuildObj();
      buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.buildInstaller();
    },
  };
};
