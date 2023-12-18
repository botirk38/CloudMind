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
  MESSAGE_POSITION_INCREMENT = 100;

  constructor(private domService: DOMService, private d3Service: D3Service) {}

  // Stack to track message positions
  messageStack: Coordinates[] = [];

  updateTextBoxPositionAndSize(): void {
      const textBoxRect = this.domService.getElementRect('textBox');
      if (!textBoxRect) {
        throw new Error('TextBox element not found');
      }

      this.updateTextBoxPosition(textBoxRect);
      this.updateTextBoxSize(textBoxRect);
      this.updateLastMessagePosition();
    }


  private updateTextBoxPosition(textBoxRect: DOMRect): void {
    this.textBoxPosition = {
      x: textBoxRect.left + window.scrollX,
      y: textBoxRect.top + window.scrollY
    };
  }

  private updateTextBoxSize(textBoxRect: DOMRect): void {
    this.textBoxSize = {
      width: textBoxRect.width,
      height: textBoxRect.height
    };
  }

  private updateLastMessagePosition(): void {
    this.lastMessagePosition = {
      x: this.textBoxPosition.x + this.textBoxSize.width,
      y: this.textBoxPosition.y + this.textBoxSize.height
    };
  }


  getTextBoxPosition(): Coordinates {
    return this.textBoxPosition;
  }

  getTextBoxSize(): { width: number; height: number } {
    return this.textBoxSize;
  }

  calculateInitialMessagePosition(buttonClicked: string): Coordinates {
    // Assuming some offset from the text box for the first message
    const xOffset = buttonClicked == 'left-button' ? 150 : 50;
    const yOffset = -45; // This can be adjusted as needed
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
    let lastPosition = isLeftSide
      ? this.lastMessagePositionLeft
      : this.lastMessagePositionRight;
    let messagesToShift = isLeftSide ? this.cardsOnLeft : this.cardsOnRight;

    if (messagesToShift.length === 1) {
      // if it's the first card on that side
      lastPosition = this.calculateInitialMessagePosition(buttonClicked);
    } else {
      // Adjust the y position for the new message
      lastPosition.y -= this.MESSAGE_POSITION_INCREMENT;
    }

    const newPosition = { ...lastPosition };

    // Shift existing messages if necessary
    this.shiftMessagesDown(
      this.MESSAGE_POSITION_INCREMENT + this.averageMessageSize.y  ,
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
    this.messageStack.forEach((position) => {
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

  calculatePositionChild(
    buttonClicked: string,
    parentId: string | null | undefined,
    messageMap: Map<string | null | undefined, MessageCard>
  ): any {
    const parentCard = messageMap.get(parentId);

    let newPosition : Coordinates = { x: 0, y: 0 };

    if (!parentCard) {
      console.log('Parent card not found');
      return null;
    }

    console.log("Adding child card with parent ID:", parentId);

    const verticalOffset = 200; // Adjust this value as needed for vertical spacing
    const horizontalOffset = 400; // Adjust this value as needed for horizontal spacing

    console.log('Parent Card Siblings:', parentCard.siblings);

    const isLeftSide = this.cardsOnLeft.some(
      (card) =>
        card.x === parentCard.position.x && card.y === parentCard.position.y
    );

    console.log('Is left side:', isLeftSide);

    // If the bottom-button is clicked
    if (
      (buttonClicked === 'bottom-button' )
    ) {
      // Place the child directly below the parent card
      if (isLeftSide) {
        newPosition = {
          x: parentCard.position.x - horizontalOffset,
          y: parentCard.position.y,
        };
        this.cardsOnLeft.push(newPosition);
      } else {
        newPosition = {
          x: parentCard.position.x + horizontalOffset,
          y: parentCard.position.y ,
        };
        this.cardsOnRight.push(newPosition);
      }
    }

    // If the top-button is clicked
    if (buttonClicked === 'top-button') {
      if(isLeftSide){
      newPosition = {
        x: parentCard.position.x - horizontalOffset,
        y: parentCard.position.y - this.averageMessageSize.y - verticalOffset,
      };
      this.cardsOnLeft.push(newPosition);
    }else{
      newPosition = {
        x: parentCard.position.x + horizontalOffset,
        y: parentCard.position.y - this.averageMessageSize.y - verticalOffset,
      };
      this.cardsOnRight.push(newPosition);
    }
    }



    console.log('New position:', newPosition);

  const parentSize = { x: this.averageMessageSize.x, y: this.averageMessageSize.y};
  const childSize = { x: this.averageMessageSize.x, y: this.averageMessageSize.y };


    this.d3Service.drawLineToChild(
      parentCard.position,
      newPosition,
      parentSize,
      childSize,
      buttonClicked
    );

    return newPosition;
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
