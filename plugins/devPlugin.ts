import { ViteDevServer } from "vite";
import { buildElectronFiles } from "./utils";

/**
 * Vite Plugin
 *
 * 使用 vite 能够加载 Electron
 *
 */
export const devPlugin = () => {
  return {
    name: "dev-plugin",
    configureServer(server: ViteDevServer) {
      buildElectronFiles(false),

      server.httpServer?.once("listening", () => {
        const { spawn } = require("child_process");
        const addressInfo = server.httpServer?.address();
        // @ts-ignore
        const httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
        const electronProcess = spawn(
          require("electron").toString(),
          ["./dist/mainEntry.js", httpAddress],
          {
            cwd: process.cwd(),
            stdio: "inherit",
          }
        );
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

export const getReplacer = () => {
  const externalModels = [
    "os",
    "fs",
    "path",
    "events",
    "child_process",
    "crypto",
    "http",
    "buffer",
    "url",
    "better-sqlite3",
    "knex",
  ];

  const result = {};

  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }

  result["electron"] = () => {
    const electronModules = [
      "clipboard",
      "ipcRenderer",
      "nativeImage",
      "shell",
      "webFrame",
    ].join(",");
    
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
