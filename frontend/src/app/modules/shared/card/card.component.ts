import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageCard } from 'src/app/models/MessageCard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() messageCard: MessageCard | undefined;
  @Output() messageCardClicked = new EventEmitter<MessageCard>();

  onCardClick(){
    if(this.messageCard){
      this.messageCardClicked.emit(this.messageCard);
    }
  }

}
