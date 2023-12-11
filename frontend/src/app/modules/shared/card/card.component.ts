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
  showButtons: boolean = false;
  @Output() buttonClicked = new EventEmitter<{message: string, isChild: boolean, parentId: string | null | undefined}>();

  ngOnInit() {
    this.messageService.activeMessageId.subscribe((id) => {
      this.activeMessageId = id;
      console.log('Card component:', this.activeMessageId);
    });
  }
  

  onCardClick(){
    if(this.messageCard){
      if(this.activeMessageId === this.messageCard?.id){
        this.messageCardUnSelected.emit();
      } else {
        this.messageCardClicked.emit(this.messageCard);
        this.showButtons = true;
      }
    }
  }

  getChildCard(id: string): MessageCard | undefined {
    return this.messageService.messageMap.get(id);
  }

  buttonClick(buttonName: string): void {
    console.log('Button clicked: ' + buttonName);
    this.showButtons = false;
    this.buttonClicked.emit({message: buttonName, isChild: true, parentId: this.activeMessageId});
  }
}
