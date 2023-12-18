import { Injectable } from '@angular/core';
import { Coordinates, MessageCard } from '../models/MessageCard';
import { LayoutService } from './layout.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private layoutService: LayoutService) {}

  messageMap: Map<string | null | undefined, MessageCard> = new Map();
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
      children: []
    };
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);

    this.messages.forEach(parent => {
      if (parent.id !== id){
        parent.siblings?.push(id);
        messageCard.siblings?.push(parent.id);
      }
    })
  }

  addMessageChild(
    message: string,
    messageTopic: string,
    parentId: string | null | undefined,
    position: Coordinates
  ) {
    const id = this.generateId();
    const messageCard: MessageCard = {
      messageTopic,
      message,
      id,
      position,
      parentId,
      children: [],
    };
  
    const parent = this.messageMap.get(parentId);
    if (parent) {
      parent.children?.push(id);
      messageCard.siblings = [...parent.children || []];
    }
    this.messageMap.set(id, messageCard);
    this.messages.push(messageCard);

    messageCard.siblings?.forEach(siblingId => {
      const sibling = this.messageMap.get(siblingId);
      if (sibling) {
        sibling.siblings?.push(id);
      }
    })

    
  }

  generateId(): string {
    return Math.random().toString(36);
  }

  onMessageReceived(buttonClicked: {message: string, isChild: boolean, parentId: string | null | undefined}) {
    console.log( "Message Card details:", buttonClicked)
    let newPos = null;
  
    if (buttonClicked.isChild) {
      console.log("Calculating position for child");
      newPos = this.layoutService.calculatePositionChild(buttonClicked.message, buttonClicked.parentId, this.messageMap);
      this.addMessageChild(buttonClicked.message, "user", buttonClicked?.parentId, newPos);
    } else {
      newPos = this.layoutService.calculatePosition(buttonClicked.message);
      this.addMessageParent(buttonClicked.message, "user", newPos);
    }
  }
}
