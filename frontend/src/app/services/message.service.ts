import { Injectable } from '@angular/core';
import { Coordinates, MessageCard } from '../models/MessageCard';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private layoutService: LayoutService) { }

  messageMap: Map<string, MessageCard> = new Map();
  messages: MessageCard[] = [];
  averageMessageSize= {x:400, y:272}
  activeMessageId: string | undefined;



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
    let newPos = this.layoutService.calculateInitialPositionParent();
    console.log("New pos:",newPos);

    if(this.activeMessageId){
      const parentMessage = this.messageMap.get(this.activeMessageId)
      if(parentMessage){
        console.log("Parent message pos:",parentMessage.position)
        console.log("Parent message size:",this.averageMessageSize)
        const availablePos = this.layoutService.getAvailablePositions(parentMessage?.position);
        console.log("Available positions:",availablePos)
        if(availablePos.length > 0){
          const randomIndex = Math.floor(Math.random() * availablePos?.length);
          newPos = availablePos[randomIndex];
          console.log(newPos);
        }
      }
    }
   console.log("Message received: " + message);
   this.activeMessageId? this.addMessageChild(message, 'AI', this.activeMessageId, newPos) : this.addMessageParent(message, 'AI', newPos);
  }



}
