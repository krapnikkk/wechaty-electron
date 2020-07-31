import { IOptions, IListRsp, IArticle, IItemRsp } from "../../typings/interface";
import { scheduleJob, Job } from "node-schedule";
import { http } from "./Http";
import { LIST_API, KEYWORD, CONTENT_API } from "../Constains";
import { Queue } from "./Queue";
import { emitter } from '../utils/Bot';

export class Spidey {
    keyword: string[];
    scheduleSpan: string;
    _scheduleJob!: Job;
    dataMap: Map<number, IItemRsp> = new Map();
    _itemQueue:Queue<IArticle>

    constructor(options: IOptions) {
        let {keyword,
            scheduleSpan } = options;
        this.keyword = keyword;
        this.scheduleSpan = scheduleSpan;
        this._itemQueue = new Queue();
        this.doSchedule();
        emitter.on('updateTask',()=>{
            this.doTask();
        });    
    }

    doSchedule() {
        if (this._scheduleJob) {
            this._scheduleJob.cancel(true);
        }
        this._scheduleJob = scheduleJob(this.scheduleSpan, () => {
            this.requestList();
            this.doTask();
        });
    }

    doTask() {
        let article = this._itemQueue.dequeue();
        if(article){
            emitter.emit('updateArticle',article);
        }
    }


    

    requestList() {
        http.get(LIST_API).then((json) => {
            let items = (json as unknown as IListRsp)['items'];
            console.log(items.length);
            this.checkList(items);
        });
    }

    requestDetails(id: string) {
        http.get(CONTENT_API + id).then((json) => {
            let content = (json as unknown as IArticle);
            this._itemQueue.enqueue(content);
        });
    }

    checkList(list: IItemRsp[]) {
        //是否已经存储至Map,接口每次返回20条数据
        let lastId = list.slice(-1)[0]['id'];
        list.forEach(item => {
            if (!this.dataMap.has(item['id'])) {//Map不存在且存在关键词时，添加到生成图片任务队列
                if (KEYWORD.some((v) => { return item['title'].includes(v) })) {
                    this.updateMap(item['id'], item);
                    this.requestDetails(item['id']+"");
                }
            } else {//已存在
                let id = this.dataMap.get(item['id'])!['id'];
                if (id < lastId) {//已经过时
                    this.deleteMap(id);
                }
            }
        })

    }

    updateMap(key: number, value: IItemRsp) {
        this.dataMap.set(key, value);
    }

    deleteMap(key: number) {
        this.dataMap.delete(key);
    }

}