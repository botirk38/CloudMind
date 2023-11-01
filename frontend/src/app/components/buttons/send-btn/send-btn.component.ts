import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.css']
})
export class SendBtnComponent {

  @Input() isTyping = false;
  @Output() sendEvent = new EventEmitter<string>();

  onSend() : void{
    this.sendEvent.emit("Message sent!");
  }

}
