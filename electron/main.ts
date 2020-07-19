import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { Wechaty, ScanStatus } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import { TOKEN, BOT_NAME } from '../src/Constains'
import 'dotenv/config';

let mainWindow: Electron.BrowserWindow | null
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: process.env.TOKEN
  }),
  name: process.env.BOT_NAME
})
console.log(process.env.TOKEN,process.env.BOT_NAME);

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true
    }
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



Object.assign(app, { bot: bot })