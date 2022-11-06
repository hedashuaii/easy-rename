
import { IpcMainInvokeEvent } from "electron";

export type IHandle = (
    event: IpcMainInvokeEvent,
    ...args: any[]
  ) => Promise<void> | any;
  