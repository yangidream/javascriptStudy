
import { Injectable } from '@angular/core';
import { Observable} from "rxjs";


@Injectable()
export class SocketServer{
  ws:WebSocket;

  constructor(){}

  //创建一个可观测的流
  createObservableSocket(url:string) :Observable<any>{
    this.ws=new WebSocket(url);
    return new Observable(
      observer =>{
        this.ws.onmessage = (event) =>observer.next(event.data);
        this.ws.onerror = (event) =>observer.error(event);
        this.ws.onclose =(event) => observer.complete();
      }
    );
  }
}
