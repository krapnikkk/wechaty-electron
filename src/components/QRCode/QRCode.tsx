import React from 'react';
import { IQRCodeProps } from '../../../typings/interface';

export default (props:IQRCodeProps) => {
    return (
        <img src ={props.src} alt="qrocde" />
    );
}