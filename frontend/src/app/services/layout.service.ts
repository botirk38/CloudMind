import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  averageMessageSize = { x: 400, y: 272 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  lastMessagePosition: Coordinates = { x: 900, y: 300 };
  isFirstMessage: boolean = true;

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
    this.messageStack.forEach((pos, index) => {
      this.messageStack[index] = { x: pos.x, y: pos.y - this.averageMessageSize.y - 20 };
    });

    // Calculate position for the new message
    const newPosition: Coordinates = this.isFirstMessage
      ? { ...this.lastMessagePosition }
      : {
          x: this.lastMessagePosition.x,
          y: this.lastMessagePosition.y + this.averageMessageSize.y + 20
        };

    // Add new message to the stack
    this.messageStack.push(newPosition);

    // Draw line to the new message
    this.drawLineToMessage(newPosition);

    // Update lastMessagePosition for the next message, but only if it's not the first message
    if (!this.isFirstMessage) {
      this.lastMessagePosition.y += this.averageMessageSize.y + 20;
    } else {
      this.isFirstMessage = false;
    }

    // Return the position for the new message
    return newPosition;
}

drawLineToMessage(newPosition: Coordinates): void {
  const textBoxPosition = this.getTextBoxPosition();
  const textBoxSize = this.getTextBoxSize();

  // Start Y - Bottom of the textbox or the top, based on the message position
  const startY = newPosition.y < textBoxPosition.y 
                 ? textBoxPosition.y 
                 : textBoxPosition.y + textBoxSize.height;

  const endY = newPosition.y + this.averageMessageSize.y / 2;

  this.createLine(textBoxPosition.x + textBoxSize.width / 2, startY, newPosition.x, endY);
}




  createLine(x1: number, y1: number, x2: number, y2: number): void {
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
  }

  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
