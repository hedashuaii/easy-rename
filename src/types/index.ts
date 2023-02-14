export enum EFileType {
  /** 文件 */
  FILE = '文件',
  /** 文件夹 */
  FOLDER = '文件夹'
}

export interface IFileItem {
  /** 当前 File 对象所引用文件最后修改时间，自 UNIX 时间起始值（1970 年 1 月 1 日 00:00:00 UTC）以来的毫秒数 */
  lastModified: number;

  /** 当前 File 对象所引用文件的名字 */
  name: string;

  /** 文件的大小 */
  size: number;

  /** 当前 File 相关的 path 或 URL */
  webkitRelativePath: string;

  /** 文件的 多用途互联网邮件扩展类型（MIME Type） */
  type: string;

  /** 文件路径 */
  path: string;
}

export interface IFileListItem extends IFileItem {
  /** 预览文件名 */
  previewName?: string;

  /** 预览扩展名 */
  previewExtension?: string;

  /** 修改结果 */
  result?: boolean;
  
  /** 文件扩展名 */
  extension?: string;

  /** 文件所在路径 */
  channelPath?: string;

  /** 文件类型 */
  fileType?: EFileType;

}

export enum ESerialOptions {
  /** 不足位补齐 */
  INSUFFICIENT_POSITION_TO_MAKE_UP,
  /** 小字字母编号 */
  SMALL_LETTER_NUMBER,
  /** 大写字母编号 */
  CAPITAL_LETTER_NUMBER,
}