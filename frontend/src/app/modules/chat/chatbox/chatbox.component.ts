import { Component } from '@angular/core';


export type Message = {
  text: string;
  sender: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  messages: Message[] = [];
  isTyping = false;

  handleMessage(messageText: string) {
    const message: Message = {
      text: messageText,
      sender: 'User',
      isUser: true
    };
    this.messages.push(message);
    this.isTyping = false;
  }

  handleIsTyping(isTyping: boolean){
    this.isTyping = isTyping;
  }
  
}
