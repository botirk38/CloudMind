import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  averageMessageSize = { x: 400, y: 272 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  lastMessagePosition: Coordinates = { x: 900, y: 625 };
  isFirstMessage: boolean = true;
  messageLines: SVGPathElement[] | null = []; // Array to track lines for each message

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
    const MESSAGE_POSITION_INCREMENT = 50;
    // Move existing messages up
    if (this.messageLines) {
      for (let i = 0; i < this.messageStack.length; i++) {
        this.messageStack[i].y -=
          this.averageMessageSize.y + MESSAGE_POSITION_INCREMENT;
        if (this.messageLines[i] !== null) {
          this.updateLinePosition(
            this.messageLines[i],
            this.messageStack[i],
            i
          );
        }
      }
    }

    // Calculate position for the new message
    const newPosition: Coordinates = this.isFirstMessage
      ? { ...this.lastMessagePosition }
      : {
          x: this.lastMessagePosition.x,
          y: this.lastMessagePosition.y - MESSAGE_POSITION_INCREMENT,
        };

    // Add new message to the stack
    this.messageStack.push(newPosition);

    // Draw line to the new message
    const newLine = this.drawLineToMessage(newPosition);
    if (newLine) {
      this.messageLines?.push(newLine);
    }

    // Update lastMessagePosition for the next message, but only if it's not the first message
    this.lastMessagePosition.y += MESSAGE_POSITION_INCREMENT;
    this.isFirstMessage = false;

    // Return the position for the new message
    return newPosition;
  }

  drawLineToMessage(newPosition: Coordinates): SVGPathElement | null {
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

    return this.createPath(startX, startY, endX, endY, isAtSameLevel);
  }

  createPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isAtSameLevel: boolean
  ): SVGPathElement | null {
    let controlX;
    let controlY;
    if (isAtSameLevel) {
      console.log("isAtSameLevel");
      // For a straight line, control point is in the middle between start and end points
      controlX = (startX + endX) / 2;
      controlY = (startY + endY) / 2; // Keeping Y same as start and end for a straight line
    } else {
      controlX = (startX + endX) / 2;
      if (endY > startY && Math.abs(endY - startY) > 30) {
        controlY = Math.max(startY, endY) + 10; // Slight curve downward
      } else {
        controlY = Math.min(startY, endY) - 10; // Slight curve upward
      }
    }

    // Create SVG and Path using D3
    const svg = d3
      .select(document.body)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('position', 'absolute')
      .style('top', '0')
      .style('left', '0');

    const path = svg
      .append('path')
      .attr(
        'd',
        `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`
      )
      .attr('stroke', 'black')
      .attr('fill', 'none');

    return path.node();
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

    d3.select(path).attr(
      'd',
      `M ${startX} ${startY} Q ${controlX} ${controlY}, ${messagePosition.x} ${endY}`
    );
  }

  zoomIn(): void {
    const zoomContainer = document.getElementById('zoomContainer');
    if (zoomContainer) {
      const currentScale =
        parseFloat(
          zoomContainer.style.transform.replace('scale(', '').replace(')', '')
        ) || 1;
      zoomContainer.style.transform = `scale(${currentScale + 0.1})`;
    }
  }

  zoomOut(): void {
    const zoomContainer = document.getElementById('zoomContainer');
    if (zoomContainer) {
      const currentScale =
        parseFloat(
          zoomContainer.style.transform.replace('scale(', '').replace(')', '')
        ) || 1;
      zoomContainer.style.transform = `scale(${currentScale - 0.1})`;
    }
  }

  // Method to reset message stack
  resetMessageStack(): void {
    this.messageStack = [];
  }
}
