import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.css']
})
export class InputboxComponent {
  @Output() messageEvent = new EventEmitter<string>();
  @Output() typingEvent = new EventEmitter<boolean>();

  userInput: string = "";
  typing = new Subject<string>();

  constructor() {
    this.typing.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.typingEvent.emit(!!value);
    });
  }

  sendMessage() {
    this.messageEvent.emit(this.userInput.trim());
    this.userInput = "";
    this.typing.next(""); 
    
  }

  onTyping() {
    this.typing.next(this.userInput);
  }
}
