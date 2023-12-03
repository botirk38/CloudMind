import { Injectable } from '@angular/core';
import { MessageCard } from '../models/MessageCard';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageMap: Map<string, MessageCard> = new Map();
  messages: MessageCard[] = [];
  averageMessageSize= {x:400, y:272}
  activeMessageId: string | undefined;


  addMessageParent(message: string, messageTopic: string, position: { x: number; y: number; }) {
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
  }

  addMessageChild(message: string, messageTopic: string, parentId: string, position: { x: number, y: number}){
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
  }
  

  generateId(): string {
    return Math.random().toString(36);
  }

  onMessageReceived(message: string){
    let newPos = {x: 100, y:100}

    if(this.activeMessageId){
      const parentMessage = this.messageMap.get(this.activeMessageId)
      if(parentMessage){
        newPos = {x: parentMessage.position.x + this.averageMessageSize.x, y: parentMessage.position.y + this.averageMessageSize.y}
      }
    }
   this.activeMessageId? this.addMessageChild(message, 'AI', this.activeMessageId, newPos) : this.addMessageParent(message, 'AI', newPos);
  }



  constructor() { }
}
