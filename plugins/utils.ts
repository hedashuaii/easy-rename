const esbuild = require("esbuild");

/**
 * 构建 Electron 相关的文件
 * @param minify 是否压缩打包后的文件
 */
export const buildElectronFiles = (minify: boolean) => {
  esbuild.buildSync({
    entryPoints: ["./src/main/mainEntry.ts"],
    bundle: true,
    platform: "node",
    minify,
    outfile: "./dist/mainEntry.js",
    external: ["electron"],
  });

  esbuild.buildSync({
    entryPoints: ["./src/preload/index.ts"],
    bundle: true,
    platform: "node",
    minify,
    outfile: "./dist/preload.js",
  });
};
