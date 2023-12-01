import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from '../../demo/demo.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {

  @Input() message: string | undefined;
  @Output() messageChange = new EventEmitter<string>();

  sendMessage(): void {
    if(this.message){
      console.log("Message sent: " + this.message);
      this.messageChange.emit(this.message);
      this.message = '';
    }
  }
}


  
  

