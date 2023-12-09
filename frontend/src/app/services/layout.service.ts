import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';
import { DOMService } from './dom.service';
import { D3Service } from './d3.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  averageMessageSize = { x: 400, y: 150 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  lastMessagePosition: Coordinates = { x: 570, y: 625 };
  cardsOnLeft: number = 0;
  cardsOnRight: number = 0;
  messageLines: SVGPathElement[] | null = []; // Array to track lines for each message
  MESSAGE_POSITION_INCREMENT = 150;

  constructor(private domService: DOMService, private d3Service: D3Service) {
  }


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
    const xOffset = 400; // This can be adjusted as needed
    const yOffset = -50; // This can be adjusted as needed
    this.d3Service.updateSvgSize(this.MESSAGE_POSITION_INCREMENT);
  
    let x = 0;
    if (buttonClicked === 'left-button') {
      x = this.textBoxPosition.x - xOffset;
    } else if (buttonClicked === 'right-button') {
      x = this.textBoxPosition.x + this.textBoxSize.width + xOffset;
    }
  
    return {
      x: x,
      y: this.textBoxPosition.y + yOffset,
    };
  }

  calculatePosition(buttonClicked: string): Coordinates {
    if (this.cardsOnLeft === 0 || this.cardsOnRight === 0) {
      this.lastMessagePosition = this.calculateInitialMessagePosition(buttonClicked);
    } else {
      for (let i = 0; i < this.messageStack.length; i++) {
        this.messageStack[i].y -=
          this.averageMessageSize.y + this.MESSAGE_POSITION_INCREMENT;
        if (this.messageLines) {
          if (this.messageLines[i]) {
            this.d3Service.updateLinePosition(
              this.messageLines[i],
              this.messageStack[i],
              this.textBoxPosition,
              this.textBoxSize,
              this.averageMessageSize,
              buttonClicked
            );
          }
        }
      }

      this.lastMessagePosition.y -= this.MESSAGE_POSITION_INCREMENT;
    }

    const newPosition = { ...this.lastMessagePosition };
    console.log('New position:', newPosition);

    this.shiftMessagesDown(this.MESSAGE_POSITION_INCREMENT + this.averageMessageSize.y, buttonClicked);
    this.d3Service.updateSvgSize(this.MESSAGE_POSITION_INCREMENT);

    this.messageStack.push(newPosition);

    const newLine = this.d3Service.drawLineToMessage(
      newPosition,
      this.textBoxPosition,
      this.textBoxSize,
      this.averageMessageSize,
      buttonClicked
    );
    if (newLine) {
      this.messageLines?.push(newLine);
    }



    return newPosition;
  }

  shiftMessagesDown(shiftAmount: number, buttonClicked: string) {
    for (let i = 0; i < this.messageStack.length; i++) {
      this.messageStack[i].y += shiftAmount + this.MESSAGE_POSITION_INCREMENT;
      if (this.messageLines !== null) {
        if (this.messageLines[i] !== null) {
          this.d3Service.updateLinePosition(
            this.messageLines[i],
            this.messageStack[i],
            this.textBoxPosition,
            this.textBoxSize,
            this.averageMessageSize,
            buttonClicked
          );
        }
      }
    }
  }

  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
