import { app, BrowserWindow, session, ipcMain, App  } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { Wechaty, FileBox } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import 'dotenv/config';
import { IApp, IContactMsg } from '../typings/interface'
import { IMAGE_SAVE_PATH, IMAGE_SAVE_EXTNAME } from '../src/Constains'

let mainWindow: Electron.BrowserWindow | null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 600,
    maxWidth: 600,
    useContentSize: true,
    center: true,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  const url_filter = {
    urls: ["http://s1.dgtle.com/*"]
  }
  session .defaultSession.webRequest.onBeforeSendHeaders(url_filter, (details, callback) => {
    details.requestHeaders['Referer'] = 'https://m.dgtle.com/'
    callback({ requestHeaders: details.requestHeaders });
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
  })
app.allowRendererProcessReuse = true



Object.assign(app, { Bot: null, Wechaty: Wechaty, PuppetPadplus: PuppetPadplus })

ipcMain.handle('say', async (event:any, args:IContactMsg) => {
  const contact = await (app as IApp)['Bot']!.Contact.find({id: args.id});
  let content = `【${args.article.title.substr(0,15)}】\n内容：${args.article.content}\n地区：${args.article.address}\n价格：${args.article.price||"暂无"}\nhttps://m.dgtle.com/sale-detail/${args.article.id}`
  contact!.say(content);
  let imgUrl = IMAGE_SAVE_PATH + args.article.id + IMAGE_SAVE_EXTNAME;
  let fileUrl = FileBox.fromFile(imgUrl);
  contact!.say(fileUrl);
})