import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  averageMessageSize = { x: 400, y: 272 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  lastMessagePosition: Coordinates = { x: 900, y: 625 };
  isFirstMessage: boolean = true;
  messageLines: SVGPathElement[] = []; // Array to track lines for each message

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
      this.messageStack[i].y -= this.averageMessageSize.y + 30;
      if (this.messageLines[i]) {
        this.updateLinePosition(this.messageLines[i], this.messageStack[i], i);
      }
    }

    // Calculate position for the new message
    const newPosition: Coordinates = this.isFirstMessage
      ? { ...this.lastMessagePosition }
      : {
          x: this.lastMessagePosition.x,
          y: this.lastMessagePosition.y - 30,
        };

    // Add new message to the stack
    this.messageStack.push(newPosition);

    // Draw line to the new message
    const newLine = this.drawLineToMessage(newPosition);
    this.messageLines.push(newLine);

    // Update lastMessagePosition for the next message, but only if it's not the first message
    if (!this.isFirstMessage) {
      this.lastMessagePosition.y += 30;
    } else {
      this.isFirstMessage = false;
    }

    // Return the position for the new message
    return newPosition;
  }

  drawLineToMessage(newPosition: Coordinates): SVGPathElement {
    const textBoxPosition = this.getTextBoxPosition();
    const textBoxSize = this.getTextBoxSize();

    let startX: number;
    let startY: number;

    const textBoxMiddleY = textBoxPosition.y + textBoxSize.height / 2;
    const messageMiddleY = newPosition.y + this.averageMessageSize.y / 2;

    // Determine if the message is at the same vertical level as the textbox
    const isAtSameLevel =
      Math.abs(textBoxMiddleY - messageMiddleY) <=
      this.averageMessageSize.y / 4;

    if (isAtSameLevel) {
      // Start from the right middle of the textbox
      startX = textBoxPosition.x + textBoxSize.width;
      startY = textBoxPosition.y + textBoxSize.height / 2;
    } else {
      // Start from either the top or bottom middle of the textbox
      startX = textBoxPosition.x + textBoxSize.width / 2;
      startY =
        newPosition.y < textBoxPosition.y
          ? textBoxPosition.y
          : textBoxPosition.y + textBoxSize.height;
    }

    // End Y - Adjust to connect to the middle of the message box
    const endX = newPosition.x;
    const endY = newPosition.y + this.averageMessageSize.y / 2;

    return this.createPath(startX, startY, endX, endY);
  }

  createPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): SVGPathElement {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const controlX = (startX + endX) / 2;
    let controlY;

    if (endY > startY && Math.abs(endY - startY) > 30) {
      // Message is below
      controlY = Math.max(startY, endY) + 10; // Slight curve downward
    } else {
      // Message is above
      controlY = Math.min(startY, endY) - 10; // Slight curve upward
    }

    const d = `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`; // Simple line path; replace with a curve if needed
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.appendChild(path);
    document.body.appendChild(svg);

    return path;
  }

  updateLinePosition(
    path: SVGPathElement,
    messagePosition: Coordinates,
    index: number
  ): void {
    const textBoxPosition = this.getTextBoxPosition();
    const textBoxSize = this.getTextBoxSize();

    let startX: number;
    let startY: number;

    const textBoxMiddleY = textBoxPosition.y + textBoxSize.height / 2;
    const endY = messagePosition.y + this.averageMessageSize.y / 2;

    if (Math.abs(textBoxMiddleY - endY) <= this.averageMessageSize.y / 4) {
      startX = textBoxPosition.x + textBoxSize.width;
      startY = textBoxMiddleY;
    } else {
      startX = textBoxPosition.x + textBoxSize.width / 2;
      startY =
        endY < textBoxPosition.y
          ? textBoxPosition.y
          : textBoxPosition.y + textBoxSize.height;
    }

    const controlX = (startX + messagePosition.x) / 2;
    let controlY;

    if (endY > startY) {
      controlY = Math.max(startY, endY) + 20;
    } else {
      controlY = Math.min(startY, endY) - 20;
    }

    const d = `M ${startX} ${startY} Q ${controlX} ${controlY}, ${messagePosition.x} ${endY}`;
    path.setAttribute('d', d);
  }

  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
