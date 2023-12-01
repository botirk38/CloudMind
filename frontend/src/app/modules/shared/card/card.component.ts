import { Component, Input } from '@angular/core';
import { MessageCard } from 'src/app/models/MessageCard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() messageCard: MessageCard | undefined;

}
