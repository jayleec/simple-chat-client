import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WebSockets {
  private ws;
  private onmessage;

  constructor() {}

  connect() {
    this.ws = new WebSocket("ws://127.0.0.1:6060/websocket");

    this.ws.onmessage = this.onmessage;
    this.ws.onopen    = (evt) => console.log("** Opened ***");

    this.ws.onclose   = this.retry.bind(this);
    // this.ws.onerror   = this.retry.bind(this);
  }

  retry(evt) {
    setTimeout(() => {
      this.connect();
    }, 3000);
    console.log(`Error: ${evt}`);
  }

  send(message: any) {
    this.ws.send(message);
  }

  onMessage(callback: any) {
    this.onmessage = callback
  }
}
