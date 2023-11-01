import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.css']
})
export class InputboxComponent {
  @Output() messageSent = new EventEmitter<string>();

  userInput: string  = "";

  sendMessage() {
    this.messageSent.emit(this.userInput);
    this.userInput = "";
  }



}
