import { Injectable } from '@angular/core';

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

  getTextBoxPosition(): { x: number; y: number } {
    return this.textBoxPosition;
  }

  getTextBoxSize(): { width: number; height: number } {
    return this.textBoxSize;
  }

  isPositionAvailable(position: { x: number; y: number }): boolean {
    return !this.occupiedPositions.has(JSON.stringify(position));
  }

  getAvailablePositions(position: {
    x: number;
    y: number;
  }): { x: number; y: number }[] {
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
