import { remote, ipcRenderer } from "electron";
import { IRemoteApp, IBotData, IArticle } from "../../typings/interface";
import { Wechaty, Message } from "wechaty";
import QRCode from 'qrcode'
import events from 'events';
import { MessageType } from "../../typings/enum";
import ElectronStore from "electron-store";
import { WECHATID } from "../Constains";
export const emitter = new events.EventEmitter();
const app = remote.app as IRemoteApp;
const store = new ElectronStore();

// let app.Bot: Wechaty;
export const createBot = (botData: IBotData): void => {
    store.set('botData',botData);
    const { token, name } = botData;

    if (app.Bot && app.Bot.logonoff()) {
        console.log('Bot logined');
        app.Bot.removeAllListeners();
        app.Bot.on('scan', onScan)
            .on("room-join", onRoomJoin) // 加入房间监听
            .on("friendship", onFriendShip) // 好友添加监听
            .on('error', onError)
            .on("message", onMessage) // 消息监听
            .on('login', onLogin)
            .on('logout', onLogout)
            .on('stop', onStop)
        emitter.emit('login');
    } else {
        console.log('Bot not logined');
        app.Bot = new app.Wechaty({
            puppet: new app.PuppetPadplus({
                token: token
            }),
            name: name
        })
        app.Bot.on('scan', onScan)
            .on("room-join", onRoomJoin) // 加入房间监听
            .on("friendship", onFriendShip) // 好友添加监听
            .on('error', onError)
            .on("message", onMessage) // 消息监听
            .on('login', onLogin)
            .on('logout', onLogout)
            .on('stop', onStop)
            .start();
    }
    emitter.on('updateTask',(arg:IArticle)=>{
        if(arg){
            send(WECHATID,arg);
        }
    });
    
    
}

export const logOutBot = () => {
    if (app.Bot) {
        app.Bot.logout().then(() => {
            onLogout();
            app.Bot = null;
        })

    }
}

const onScan = (qrocde: string) => {
    if (qrocde) {
        console.log(qrocde);
        QRCode.toDataURL(qrocde)
            .then((url: string) => {
                emitter.emit('qrcode', url);
            })
            .catch(err => {
                console.error(err)
            })
    }
}

const onLogout = ()=>{
    emitter.emit('logout');
}

const onLogin = () => {
    emitter.emit('login');
    // send('Krapnik','hi?');
}

const onRoomJoin = () => {

}

const onMessage = (msg: Message) => {
    if (msg.self()) return

    console.log("=============================")
    console.log(`msg : ${msg}`)
    console.log(
        `from: ${msg.from() ? msg.from()!.name() : null}: ${
        msg!.from() ? msg.from()!.id : null
        }`
    )
    console.log(`to: ${msg.to()}`)
    console.log(`text: ${msg.text()}`)
    console.log(`isRoom: ${msg.room()}`)
    console.log("=============================")

    // 判断此消息类型是否为文本
    if (msg.type() == MessageType.Text) {
        // 判断消息类型来自群聊
        if (msg.room()) {
            // 获取群聊
            // const room = await msg.room()

        } else {
            // 返回聊天接口内容
            msg.say('hello')
        }
    } else {
        console.log("消息不是文本！")
    }
}

export const send = async (id:string,article:IArticle)=>{
    if (app.Bot) {
        
        ipcRenderer.invoke('say', {id:id,article:article}).then((result) => {
            console.log('say done!');
        })
    }
}

const onFriendShip = () => {

}

const onError = (error: Error) => {
    console.log(error);
}

const onStop = () => {
    console.log('stop');
}


