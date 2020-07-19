import { Wechaty } from "wechaty";

export interface IRemoteApp extends Electron.App{
    bot:Wechaty
}