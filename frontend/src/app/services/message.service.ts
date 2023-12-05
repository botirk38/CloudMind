import { Injectable } from '@angular/core';
import { Coordinates, MessageCard } from '../models/MessageCard';
import { LayoutService } from './layout.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private layoutService: LayoutService) { }

  messageMap: Map<string, MessageCard> = new Map();
  messages: MessageCard[] = [];
  averageMessageSize= {x:400, y:272}
  activeMessageId = new BehaviorSubject<string | null>(null);



  addMessageParent(message: string, messageTopic: string, position: Coordinates) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId: null
    }
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);
    this.layoutService.occupiedPositions.add(JSON.stringify(position));
  }

  addMessageChild(message: string, messageTopic: string, parentId: string, position: Coordinates){
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId
    }
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);
    this.layoutService.occupiedPositions.add(JSON.stringify(position));
  }
  

  generateId(): string {
    return Math.random().toString(36);
  }

  onMessageReceived(message: string){
    let currentValue = this.activeMessageId.getValue();
    let newPos = this.layoutService.calculateInitialPositionParent();


    if(this.activeMessageId && currentValue){
      const parentMessage = this.messageMap.get(currentValue)
      if(parentMessage){
        const availablePos = this.layoutService.getAvailablePositions(parentMessage?.position);
        console.log("Available positions:",availablePos)
        if(availablePos.length > 0){
          const randomIndex = Math.floor(Math.random() * availablePos?.length);
          newPos = availablePos[randomIndex];
        }
      }
    }
   this.activeMessageId? this.addMessageChild(message, 'AI', currentValue ? currentValue : "", newPos) : this.addMessageParent(message, 'AI', newPos);
  }



}
