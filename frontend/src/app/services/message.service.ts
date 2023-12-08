import { Injectable } from '@angular/core';
import { Coordinates, MessageCard } from '../models/MessageCard';
import { LayoutService } from './layout.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private layoutService: LayoutService) {}

  messageMap: Map<string, MessageCard[]> = new Map();
  messages: MessageCard[] = [];
  averageMessageSize = { x: 400, y: 272 };
  activeMessageId = new BehaviorSubject<string | null>(null);

  addMessageParent(
    message: string,
    messageTopic: string,
    position: Coordinates
  ) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId: null,
    };
    this.messageMap.set(id, []);
    this.messages.push(messageCard);
  }

  addMessageChild(
    message: string,
    messageTopic: string,
    parentId: string,
    position: Coordinates
  ) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId,
    };
    const parentMessages = this.messageMap.get(parentId);
    parentMessages?.push(messageCard);
    this.messages.push(messageCard);
  }

  generateId(): string {
    return Math.random().toString(36);
  }

  onMessageReceived(message: string) {
   const newPos = this.layoutService.calculatePosition();

   this.addMessageParent(message, "user", newPos)
  }
}
