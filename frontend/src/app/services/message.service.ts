import { Injectable } from '@angular/core';
import { MessageCard } from '../models/MessageCard';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageMap: Map<string, MessageCard> = new Map();
  messages: MessageCard[] = [];


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
  

  generateId(): string {
    return Math.random().toString(36);
  }



  constructor() { }
}
