import React, { useState, useEffect } from 'react';
import { remote } from 'electron';
import { Container, Image, Text } from './styles';
import { IRemoteApp } from '../../../typings/interface';
const app = remote.app as IRemoteApp;



export default () => {
  const [imgData, setImgData] = useState('');
  // console.log(app)
  // useEffect(() => {

  // });

  return (
    <Container>
      <Text>{imgData}</Text>
      <button
        onClick={() => {
          setImgData('123456');
          app.bot.on('scan', (qrocde: string) => {
            console.log(qrocde);
          }).start();
        }}
      >
        update
      </button>
    </Container>
  );
};

// export default Greetings
