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
    // Push existing messages up
    console.log("Before moving it up: ", this.messageStack)
    console.log('averageMessageSize.y', this.averageMessageSize.y);
    for (let i = 0; i < this.messageStack.length; i++) {
      this.messageStack[i].y -= this.averageMessageSize.y + 20;
    }

    console.log("After moving it up: ", this.messageStack)

    // Position for new message (at the bottom)
    const newPosition = { 
      x: this.lastMessagePosition.x, 
      y: this.lastMessagePosition.y + this.averageMessageSize.y
   };

   this.lastMessagePosition = newPosition;

    // Add new message to the stack
    this.messageStack.push(newPosition);

    // Return the position for the new message
    return newPosition;
  }

  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
