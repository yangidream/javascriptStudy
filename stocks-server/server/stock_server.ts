import * as express from "express";
import {Server} from "ws";

import * as path from "path";

const app=express();

app.use('/',express.static(path.join(__dirname,'..','client')));

app.get('/api/stock',(req,res)=>{
    let result =stocks;
    let params=req.query;
    if(params.nam){
        result =result.filter(stock => stock.name.indexOf(params.name)!==-1);
    };
    res.json(result);
});

app.get('/api/stock/:id',(req,res)=>{
    res.json(stocks.find(stock => stock.id ==req.params.id))
});

const server=app.listen(8000,"localhost",()=>{
    console.log("服务器已经启动，地址是:http://localhost:8000");
});


const subscriptions =new Set<any>();
var messageCount=0;
const wsServer = new Server({port:8085});
wsServer.on('connection',websocket =>{
    subscriptions.add(websocket);
});
setInterval(()=>{
    subscriptions.forEach(ws =>{
        if(ws.readyState === 1){
            ws.send(JSON.stringify({messageCount:messageCount++}));
        }else{
            subscriptions.delete(ws);
        }
    })
},2000);



export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public cateqories: Array<string>) {

    }

};
const stocks: Stock[]= [
        new Stock(1, '第1只股票', 1.99, 1.5, 'desc', ['IT', '互联网']),
        new Stock(2, '第2只股票', 2.99, 2.5, 'desc', ['金融', '互联网']),
        new Stock(3, '第3只股票', 3.99, 3.5, 'desc', ['IT', '互联网']),
        new Stock(4, '第4只股票', 5.99, 4.5, 'desc', ['IT', '互联网']),
        new Stock(5, '第5只股票', 1.93, 3.6, 'desc', ['金融', '互联网']),
        new Stock(6, '第6只股票', 1.89, 3.6, 'desc', ['IT', '互联网']),
        new Stock(7, '第7只股票', 1.79, 3.7, 'desc', ['IT', '金融']),
        new Stock(8, '第8只股票', 1.69, 3.8, 'desc', ['IT', '互联网']),
        new Stock(9, '第9只股票', 1.59, 3.0, 'desc', ['金融', '互联网'])

    ];




