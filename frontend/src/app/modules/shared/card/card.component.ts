import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageCard } from 'src/app/models/MessageCard';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(private messageService: MessageService) {}

  @Input() messageCard: MessageCard | undefined;
  @Output() messageCardClicked = new EventEmitter<MessageCard>();
  @Output() messageCardUnSelected = new EventEmitter<void>();
  activeMessageId: string | null = null;

  ngOnInit() {
    this.messageService.activeMessageId.subscribe((id) => {
      this.activeMessageId = id;
      console.log('Card component:', this.activeMessageId);
    });
  }
  

  onCardClick(){
    if(this.messageCard){
      console.log('activeMessageId:', this.activeMessageId);
      console.log('messageCard id:', this.messageCard?.id);
      if(this.activeMessageId === this.messageCard?.id){
        console.log('Emitting messageCardUnSelected event');
        this.messageCardUnSelected.emit();
      } else {
        console.log('Emitting messageCardClicked event');
        this.messageCardClicked.emit(this.messageCard);
      }
    }
  }
}
