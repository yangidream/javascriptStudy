import { Component, OnInit } from '@angular/core';
import {SocketServer} from "./socket.server";
import {environment} from "../../environments/environment.prod";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  messageCount =0;
  title=environment.appTitle;
  constructor(public socketService:SocketServer) { }

  ngOnInit() {
    this.socketService.createObservableSocket("ws://localhost:8085")
      .map(event =>JSON.parse(event))
      .subscribe(
        event => this.messageCount =event.messageCount
      );
  }

}
