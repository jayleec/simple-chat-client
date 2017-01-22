import { Component } from '@angular/core';

import { NavController, NavParams, Keyboard } from 'ionic-angular';
import { WebSockets } from '../../app/services/chat.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  username: any;

  messages = [];
  myId = "";
  chatBox ="";

  constructor(public navCtrl: NavController, public params: NavParams, private ws: WebSockets, public keyboard:Keyboard) {
    this.username = params.get('username');

    this.ws.onMessage(e =>{
      // this.messages.push()
      this.delegateData(e);
    })

    this.ws.connect();
  }

  delegateData(e){
    console.log("delegate: "+e);
    let data = JSON.parse(e.data);
    this.messages.push(data.msg);

  }

  sendMessage(message){
    this.ws.send(message);
    // this.messages.push(message);
    this.chatBox ="";
  }


}
