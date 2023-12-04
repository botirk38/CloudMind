import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  averageMessageSize = { x: 400, y: 272 };
  textBoxPosition = { x: 0, y: 0 };
  textBoxSize = { width: 0, height: 0 };
  occupiedPositions = new Set<string>();

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

  calculateInitialPositionParent(): Coordinates {
    let xPos = this.getTextBoxPosition().x + this.getTextBoxSize().width + this.averageMessageSize.x;
    let yPos = this.getTextBoxPosition().y;
    const result = new Array<Coordinates>(10);
    const maxIterations = 1000; // Adjust this value as needed
    let iterations = 0;
  
    while (yPos <= this.getTextBoxPosition().y + this.getTextBoxSize().height && iterations < maxIterations) {
      if (this.isPositionAvailable({ x: xPos, y: yPos }) && result.length < 10) {
        result.push({ x: xPos, y: yPos });
      }
  
      // Move to the next potential position
      yPos += this.averageMessageSize.y;
      if (yPos > this.getTextBoxPosition().y + this.getTextBoxSize().height) {
        yPos = this.getTextBoxPosition().y;
        xPos += this.averageMessageSize.x;
      }
  
      iterations++;
    }
  
    const randomIndex = Math.floor(Math.random() * result.length);
    return result[randomIndex];
  }

  isPositionAvailable(position: Coordinates): boolean {
    return !this.occupiedPositions.has(JSON.stringify(position));
  }

  getAvailablePositions(position: { x: number; y: number }): Coordinates[] {
    const gapSize = 200;
    const directions = [
      { x: this.averageMessageSize.x + gapSize, y: 0 }, // Right
      { x: -this.averageMessageSize.x - gapSize, y: 0 }, // Left
      { x: 0, y: this.averageMessageSize.y + gapSize }, // Down
      { x: 0, y: -this.averageMessageSize.y - gapSize }, // Up
    ];

    for (const direction of directions) {
      const newPos = {
        x: position.x + direction.x,
        y: position.y + direction.y,
      };
      if (this.isPositionAvailable(newPos)) {
        return [newPos];
      }
    }

    return [];
  }
}
