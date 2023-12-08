import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  averageMessageSize = { x: 400, y: 272 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  lastMessagePosition: Coordinates = { x: 900, y: 625};
  isFirstMessage: boolean = true;
  messageLines: SVGLineElement[] = []; // Array to track lines for each message


  // Stack to track message positions
  messageStack: Coordinates[] = [];

  updateTextBoxPositionAndSize() {
    const textBox = document.getElementById('textBox');
    if (textBox) {
      const textBoxRect = textBox.getBoundingClientRect();
      this.textBoxPosition = {
        x: textBoxRect.left + window.scrollX,
        y: textBoxRect.top + window.scrollY,
      };
      this.textBoxSize = {
        width: textBoxRect.width,
        height: textBoxRect.height,
      };
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

  calculatePosition(): Coordinates {
    // Move existing messages up
    for (let i = 0; i < this.messageStack.length; i++) {
      this.messageStack[i].y -= this.averageMessageSize.y + 10;
      if (this.messageLines[i]) {
        this.updateLinePosition(this.messageLines[i], this.messageStack[i]);
      }
    }

    // Calculate position for the new message
    const newPosition: Coordinates = this.isFirstMessage
      ? { ...this.lastMessagePosition }
      : {
          x: this.lastMessagePosition.x,
          y: this.lastMessagePosition.y  - 10,
        };

    // Add new message to the stack
    this.messageStack.push(newPosition);

    // Draw line to the new message
    const newLine = this.drawLineToMessage(newPosition);
    this.messageLines.push(newLine);


    // Update lastMessagePosition for the next message, but only if it's not the first message
    if (!this.isFirstMessage) {
      this.lastMessagePosition.y += 50;
    } else {
      this.isFirstMessage = false;
    }

    // Return the position for the new message
    return newPosition;
}

drawLineToMessage(newPosition: Coordinates): SVGLineElement {
  const textBoxPosition = this.getTextBoxPosition();
  const textBoxSize = this.getTextBoxSize();

  let startX: number;
  let startY: number;

  // Determine if the Y position of the message is close to that of the textbox
  const isYPositionClose = Math.abs(newPosition.y - textBoxPosition.y) < this.averageMessageSize.y;
  console.log("New Position: " + newPosition.y);
  console.log(" Distance from textbox",Math.abs(newPosition.y - textBoxPosition.y));
  console.log(" Condition:" ,this.averageMessageSize.y / 2);

  if (isYPositionClose) {
      // If Y positions are close, start from the right middle of the textbox
      startX = textBoxPosition.x + textBoxSize.width + 10;
      startY = textBoxPosition.y + textBoxSize.height / 2;
  } else {
      // Otherwise, start from either the top or bottom middle of the textbox
      startX = textBoxPosition.x + textBoxSize.width / 2;
      startY = newPosition.y < textBoxPosition.y 
               ? textBoxPosition.y 
               : textBoxPosition.y + textBoxSize.height;
  }

  // End Y - Adjust to connect to the middle of the message box
  const endY = newPosition.y + this.averageMessageSize.y / 2;

  const line = this.createLine(startX, startY, newPosition.x, endY);

  return line;
}


  createLine(x1: number, y1: number, x2: number, y2: number): SVGLineElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('stroke', 'black');

    svg.appendChild(line);

    document.body.appendChild(svg);

    return line;
  }

  updateLinePosition(line: SVGLineElement, messagePosition: Coordinates): void {
    // Update line's end position based on the message's new position
    const endY = messagePosition.y + this.averageMessageSize.y / 2;
    line.setAttribute('y2', endY.toString());
  }

  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
