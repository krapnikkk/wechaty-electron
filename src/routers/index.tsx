import React, { useState } from 'react';
import QRCodeComponent from '../components/QRCode/QRCode';
import LoginBar from '../components/LoginBar/LoginBar';
import { emitter } from '../utils/Bot';
import { Spidey } from '../utils/Spider';
import ElectronStore from 'electron-store';
import { IBotData, IArticle } from '../../typings/interface';
import SettingBar from '../components/SettingBar/SettingBar';
import ArticleArea from '../components/ArticleArea/ArticleArea';
import { SCHEDULE_SPAN, KEYWORD } from '../Constains';
const ShowQRCodeIMG = (imgData: string) => {
  return imgData ? <QRCodeComponent src={imgData} /> : null
}
let eventLock: boolean = false;
let spidey = new Spidey({
  keyword: KEYWORD,
  scheduleSpan: SCHEDULE_SPAN
});



const store = new ElectronStore();
let data = store.get("botData") as IBotData;



export default () => {
  const [imgData, setImgData] = useState('');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [online, setOnline] = useState(false);
  const [msg, setMsg] = useState('请输入name&token点击按钮登录wechaty~');
  const [article,setArticle] = useState(null);

  if (!eventLock) {
    eventLock = true;
    emitter.on('qrcode', function (qrcode) {
      setImgData(qrcode);
    });
    eventLock = true;
    emitter.on('logout', function () {
      setOnline(false);
      setMsg('请输入name&token点击按钮登录wechaty~');
    });
    emitter.on('login', function () {
      setOnline(true);
      setMsg('登录成功！点击按钮即可以退出wechaty');
      emitter.emit('qrcode', '');
    });
    if (data) {
      setToken(data.token);
      setName(data.name);
    }
    emitter.on('qrcode', function (qrcode) {
      if (qrcode) {
        setMsg('请使用手机扫码登录！');
      }
    });
    emitter.on('updateArticle',function (item){
      setArticle(item);
    });
  }

  // useEffect(() => {

  // });

  return (
    <div>
      <LoginBar name={name} token={token} online={online} msg={msg} />
      {ShowQRCodeIMG(imgData)}
      <SettingBar />
      <ArticleArea data={article} />
    </div>
  );
};

