import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  constructor() { }
  private stocks: Stock[]= [
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

  getStocks(): Stock[] {
     return this.stocks;
  }
  getStock(id: number): Stock {

     var stock= this.stocks.find(stock => stock.id  ==  id);
     if(!stock){
       stock = new Stock(0, '', 0, 0, '', ['', ''])
     };
     return stock;
  }


}
export class Stock {
  constructor(public id: number,
              public name: string,
              public price: number,
              public rating: number,
              public desc: string,
              public cateqories: Array<string>) {

  }

}
