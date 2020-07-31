import { Wechaty } from "wechaty";
import PuppetPadplus from "wechaty-puppet-padplus";
import { App } from "electron";

export interface IApp extends App{ 
    Bot?:Wechaty
}

export interface IContactMsg{
    id:string,
    article:IArticle
}

export interface IRemoteApp extends Electron.App {
    Bot:Wechaty|null, 
    Wechaty: typeof Wechaty,
    PuppetPadplus: typeof PuppetPadplus
}

export interface IQRCodeProps {
    src: string;
}

export interface IArticleProps{
    data:IArticle|null
}

export interface IListRsp{
    items:IItemRsp[];
}

export interface IItemRsp{
    id:number;
    title:string;
    address:string;
    price:string;
}

export interface ILoginBarProps {
    name: string;
    token: string;
    online:boolean;
    msg:string;
}

export interface IBotData {
    token: string
    name: string
}

export interface IOptions {
    keyword: string[];
    scheduleSpan: string;
}

export interface IArticle{
    id:number;
    title:string;
    content:string;
    price:string;
    freight:string|null;
    address:string;
    url:string;
    status:number;
    imgs_url:string[];
    updated_at:number;
}