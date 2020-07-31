import React, {  useRef, useEffect } from 'react';
import { Comment } from 'antd';
import { IArticle, IArticleProps } from '../../../typings/interface';
import DomToImage from "dom-to-image";
import * as fs from "fs";
import { IMAGE_SAVE_PATH, IMAGE_SAVE_EXTNAME, SHOTSCREEN_SPAN } from '../../Constains';
import { emitter } from '../../utils/Bot';

let article:IArticle|null = null;
function createImage(dom: Element, tid: string) {
    DomToImage.toPng(dom, { width: 600, bgcolor: "#fff" })
        .then((imgData: string) => {
            let base64Data = imgData.replace(/^data:image\/\w+;base64,/, ""),
                dataBuffer = new Buffer(base64Data, "base64"),
                filePath = IMAGE_SAVE_PATH + tid + IMAGE_SAVE_EXTNAME;
            console.log(filePath);
            fs.writeFileSync(
                filePath,
                dataBuffer
            );
            emitter.emit('updateTask',article);
        })
        .catch((error: Error) => {
            console.error("oops, something went wrong!", error);
            emitter.emit('updateTask',article);
        });
}

export default (props: IArticleProps) => {
    const imageDom = useRef(null);
    article = props.data;
    useEffect(() => {
        // console.log(imageDom!.current!);
        //     setRefDom(this.refs.imageDom);
        //     imageDom = ReactDOM.findDOMNode(imageDom) as Element;
        setTimeout(() => {
            if(article){
                createImage(imageDom!.current!, article!.id + "");
            }
        }, SHOTSCREEN_SPAN);

    });
    return (
        article ? <div ref={imageDom}>
            <Comment
                author={
                    <section>
                        <h2>{article.title}</h2>
                        <span>价格：{article.price} </span>
                        <span>地区：{article.address} </span>
                        <span>发布时间：{new Date(article.updated_at).toLocaleString()} </span>
                    </section>
                }
                content={
                    <p>{article.content}</p>
                }
                children={
                    article.imgs_url.map((val, idx) => {
                        return <img style={{ width: "500px", display: "block" }} src={val} key={idx} alt="img" />
                    })}
            />
        </div> : null
    );
};