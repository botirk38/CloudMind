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
    let initialXPos = this.getTextBoxPosition().x;
    let initialYPos = this.getTextBoxPosition().y - this.averageMessageSize.y;
    const result = [];
    const maxIterations = 1000;
    let iterations = 0;

    for (
      let yPos = initialYPos;
      iterations < maxIterations && result.length < 10;
      yPos -= this.averageMessageSize.y
    ) {
      for (
        let xPos = initialXPos;
        xPos <= this.getTextBoxPosition().x + this.getTextBoxSize().width &&
        result.length < 10;
        xPos += this.averageMessageSize.x
      ) {
        const availablePositions = this.getAvailablePositions({
          x: xPos,
          y: yPos,
        });
        result.push(...availablePositions);
        iterations++;
        if (iterations >= maxIterations) break;
      }
    }

    console.log(result);

    if (result.length > 0) {
      result.sort((a, b) => {
        const distanceA = Math.sqrt(
          Math.pow(a.x - this.getTextBoxPosition().x, 2) +
            Math.pow(a.y - this.getTextBoxPosition().y, 2)
        );
        const distanceB = Math.sqrt(
          Math.pow(b.x - this.getTextBoxPosition().x, 2) +
            Math.pow(b.y - this.getTextBoxPosition().y, 2)
        );
        return distanceA - distanceB;
      });
      const randomIndex = Math.floor(
        Math.random() * Math.floor(result.length / 2)
      );
      return result[randomIndex];
    } else {
      console.log('No position found');
      return { x: 100, y: 100 }; // Or some default value
    }
  }

  isPositionAvailable(position: Coordinates): boolean {
    return (
      !this.occupiedPositions.has(JSON.stringify(position)) &&
      (position.x >=
        this.getTextBoxPosition().x + this.getTextBoxSize().width ||
        position.y >=
          this.getTextBoxPosition().y + this.getTextBoxSize().height ||
        position.x + this.averageMessageSize.x <= this.getTextBoxPosition().x ||
        position.y + this.averageMessageSize.y <= this.getTextBoxPosition().y)
    );
  }

  getAvailablePositions(position: { x: number; y: number }): Coordinates[] {
    const gapSize = 100;
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
