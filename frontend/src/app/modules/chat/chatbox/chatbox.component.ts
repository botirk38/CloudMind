import { Component } from '@angular/core';


type Message = {
  text: string;
  sender: string;
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  messages: Message[] = [];

  handleMessage(event: Message) {
    this.messages.push(event);
  }
}
