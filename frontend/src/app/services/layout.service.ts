import { Injectable } from '@angular/core';
import { Coordinates, MessageCard } from '../models/MessageCard';
import { DOMService } from './dom.service';
import { D3Service } from './d3.service';
import * as d3 from 'd3';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  
  averageMessageSize = { x: 320, y: 128 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  lastMessagePosition: Coordinates = { x: 570, y: 625 };
  lastMessagePositionLeft: Coordinates = { x: 100, y: 290 };
  lastMessagePositionRight: Coordinates = { x: 570, y: 625 };
  cardsOnLeft: [Coordinates] = [{ x: 0, y: 0 }];
  cardsOnRight: [Coordinates] = [{ x: 0, y: 0 }];
  messageLines: SVGPathElement[] | null = [];
  leftMessageLines: SVGPathElement[] | null = [];
  rightMessageLines: SVGPathElement[] | null = [];
  MESSAGE_POSITION_INCREMENT = 50;

  constructor(private domService: DOMService, private d3Service: D3Service) {}

  // Stack to track message positions
  messageStack: Coordinates[] = [];

  updateTextBoxPositionAndSize() {
    console.log('Calling');
    const textBox = document.getElementById('textBox');
    if (textBox) {
      const textBoxRect = this.domService.getElementRect('textBox')!;
      this.textBoxPosition = {
        x: textBoxRect.left + window.scrollX,
        y: textBoxRect.top + window.scrollY,
      };
      this.textBoxSize = {
        width: textBoxRect.width,
        height: textBoxRect.height,
      };
      this.lastMessagePosition.x =
        this.textBoxPosition.x + this.textBoxSize.width;
      this.lastMessagePosition.y =
        this.textBoxPosition.y + this.textBoxSize.height;
    } else {
      console.error('TextBox element not found');
    }
  }

  getTextBoxPosition(): Coordinates {
    return this.textBoxPosition;
  }

  getTextBoxSize(): { width: number; height: number } {
    return this.textBoxSize;
  }

  calculateInitialMessagePosition(buttonClicked: string): Coordinates {
    // Assuming some offset from the text box for the first message
    const xOffset = buttonClicked == 'left-button' ? 150: 50;
    const yOffset = -45;// This can be adjusted as needed
    this.d3Service.updateSvgSize(this.MESSAGE_POSITION_INCREMENT);

    let x =
      buttonClicked === 'left-button'
        ? this.textBoxPosition.x - this.textBoxSize.width - xOffset
        : this.textBoxPosition.x + this.textBoxSize.width + xOffset;

    return {
      x: x,
      y: this.textBoxPosition.y + yOffset,
    };
  }

  // LayoutService

  calculatePosition(buttonClicked: string): Coordinates {
    let isLeftSide = buttonClicked === 'left-button';
    let lastPosition = isLeftSide ? this.lastMessagePositionLeft : this.lastMessagePositionRight;
    let messagesToShift = isLeftSide ? this.cardsOnLeft : this.cardsOnRight;
  
    if (messagesToShift.length === 1) {  // if it's the first card on that side
        lastPosition = this.calculateInitialMessagePosition(buttonClicked);
    } else {
        // Adjust the y position for the new message
        lastPosition.y -= this.MESSAGE_POSITION_INCREMENT;
    }
  
    const newPosition = { ...lastPosition };
    console.log('New position:', newPosition);
  
    // Shift existing messages if necessary
    this.shiftMessagesDown(
        this.MESSAGE_POSITION_INCREMENT + this.averageMessageSize.y,
        messagesToShift
    );

    // Update the last position state
    if (isLeftSide) {
        this.lastMessagePositionLeft = newPosition;
        this.cardsOnLeft.push(newPosition);
    } else {
        this.lastMessagePositionRight = newPosition;
        this.cardsOnRight.push(newPosition);
    }

    // Add new position to message stack and redraw lines
    this.messageStack.push(newPosition);
    d3.select('#mindMapSvg').selectAll('path').remove();
    this.messageStack.forEach(position => {
        this.d3Service.drawLineToMessage(
            position,
            this.textBoxPosition,
            this.textBoxSize,
            this.averageMessageSize,
            position.x < this.textBoxPosition.x ? 'left-button' : 'right-button'
        );
    });
  
    return newPosition;
}

calculatePositionChild(buttonClicked: string, parentId: string | null | undefined, messageMap: Map<string|null|undefined, MessageCard>): any {
  const parentCard = messageMap.get(parentId);

  if(!parentCard) {
    console.log("Parent card not found");
    return null;
  }
  

  console.log("Calculating position for child card");

  const verticalOffset = 100; // Adjust this value as needed for vertical spacing
  const horizontalOffset = 200; // Adjust this value as needed for horizontal spacing

  console.log("Parent Card Siblings:" ,parentCard.siblings);

  // If the bottom-button is clicked
  if (buttonClicked === 'bottom-button' && !parentCard.siblings || parentCard.siblings?.length === 0) {
    // Place the child directly below the parent card
    return {
      x: parentCard.position.x + horizontalOffset,
      y: parentCard.position.y  + this.averageMessageSize.y + verticalOffset
    };
  }

  // If the top-button is clicked
  if (buttonClicked === 'top-button') {
    // Place the child directly above the parent card
    return {
      x: parentCard.position.x + horizontalOffset,
      y: parentCard.position.y - this.averageMessageSize.y - verticalOffset
    };
  }
}



  

shiftMessagesDown(shiftAmount: number, messagesToShift: Coordinates[]): void {
  for (let i = 0; i < messagesToShift.length; i++) {
      messagesToShift[i].y += shiftAmount;
  }
}


  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
