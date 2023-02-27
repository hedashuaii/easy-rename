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

/** 序号操作栏 - 预设模板 */
export enum ESerialOptions {
  /** 不足位补齐 */
  INSUFFICIENT_POSITION_TO_MAKE_UP,
  /** 小字字母编号 */
  SMALL_LETTER_NUMBER,
  /** 大写字母编号 */
  CAPITAL_LETTER_NUMBER,
}

/** 删除操作栏 - 操作类型 */
export enum ERemoveType {
  /** 内容删除 */
  CONTENT = '内容删除',
  /** 区间删除 */
  INTERVAL = '区间删除',
}

/** 扩展操作 操作栏 - 预设方案 */
export enum EExtendPresetScheme {
  /** 汉字转换为拼音 */
  ConversionOfChineseCharactersToPinyin = "汉字转换为拼音",
  /** 汉字转换为拼音且首字母大写 */
  ConversionOfChineseCharactersToPinyinCapitalized = "汉字转换为拼音且首字母大写",
}


/** 配置 Store */
export interface IControlConfig {
  /** 整体 */
  entirety: {
    /** 文件名操作类型 */
    fileNameOpertaionType: string
    /** 文件名被替换的字符 */
    fileNameReplaceText: string
    /** 扩展名操作类型 */
    extensionNameOpertaionType: string
    /** 扩展名被替换的字符 */
    extensionNameReplaceText: string
  }

  /** 替换 */
  replace: {
    /** 文件名中需要被替换的文字 */
    originText: string
    /** 被替换成的文字 */
    replaceText: string
  }

  /** 序号 */
  serial: {
    /** 序号模板 */
    template: string
    /** 开始编号 */
    start: number
    /** 增量 */
    deep: number
    /** 位数 */
    length: number
    /** 选项 */
    options: ESerialOptions[]
  }

  /** 添加 */
  append: {
    /** 文件名前添加 */
    prepend: string
    /** 文件名后添加 */
    append: string
    /** 文件名中添加-从文件名第几个开始 */
    insert: string
    /** 文件名中添加-添加的文字内容 */
    insertIndex: number
  }

  /** 删除 */
  remove: {
    /** 删除类型 */
    deleteType: ERemoveType
    /** 从文件名第几个字符开始删除 */
    startIndex: number
    /** 从文件名第X个字符开始删除几个字符 */
    deleteLength: number
    /** 删除文件名的字符串 */
    deleteString: string
  }

  /** 扩展更名 */
  extend: {
    /** 预设方案 */
    extends?: EExtendPresetScheme
  }
}
