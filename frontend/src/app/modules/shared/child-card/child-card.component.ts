import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageCard } from 'src/app/models/MessageCard';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent {

  @Input() messageCard: MessageCard | undefined;
  @Output() messageCardClicked = new EventEmitter<MessageCard>();
  showButtons: boolean = false;

  constructor() { }

  onCardClick(): void {
    this.showButtons = true;
    this.messageCardClicked.emit(this.messageCard);
  }


}
