import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.css']
})
export class InputboxComponent {
<<<<<<< HEAD
  @Output() messageSent = new EventEmitter<string>();
=======
  @Output() messageEvent = new EventEmitter<string>();
  @Output() typingEvent = new EventEmitter<boolean>();
>>>>>>> b3585f26abb254068f9ccd031428528366f58a2b

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
<<<<<<< HEAD
    this.messageSent.emit(this.userInput);
=======
    this.messageEvent.emit(this.userInput.trim());
>>>>>>> b3585f26abb254068f9ccd031428528366f58a2b
    this.userInput = "";
    this.typing.next(""); 
    
  }

  onTyping() {
    this.typing.next(this.userInput);
  }
}
