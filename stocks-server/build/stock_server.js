"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var path = require("path");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api/stock', function (req, res) {
    var result = stocks;
    var params = req.query;
    if (params.nam) {
        result = result.filter(function (stock) { return stock.name.indexOf(params.name) !== -1; });
    }
    ;
    res.json(result);
});
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (stock) { return stock.id == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已经启动，地址是:http://localhost:8000");
});
var subscriptions = new Set();
var messageCount = 0;
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', function (websocket) {
    subscriptions.add(websocket);
});
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
var Stock = (function () {
    function Stock(id, name, price, rating, desc, cateqories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.cateqories = cateqories;
    }
    return Stock;
}());
exports.Stock = Stock;
;
var stocks = [
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
