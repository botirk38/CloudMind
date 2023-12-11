import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class D3Service {
  constructor() {}

  drawLineToMessage(
    newPosition: Coordinates,
    textBoxPosition: Coordinates,
    textBoxSize: { width: number; height: number },
    averageMessageSize: { x: number; y: number },
    buttonClicked: string
): SVGPathElement | null {
    let startX: number;
    let startY: number;
  
    const isAbove = newPosition.y + averageMessageSize.y < textBoxPosition.y;
    const isBelow = newPosition.y > textBoxPosition.y + textBoxSize.height;

    if (isAbove) {
        // Start from the top middle of the textbox
        startX = textBoxPosition.x + textBoxSize.width / 2;
        startY = textBoxPosition.y;
    } else if (isBelow) {
        // Start from the bottom middle of the textbox
        startX = textBoxPosition.x + textBoxSize.width / 2;
        startY = textBoxPosition.y + textBoxSize.height;
    } else {
        // Start from the middle-left or middle-right based on button clicked
        startX = buttonClicked === 'left-button' ? textBoxPosition.x + textBoxSize.width : textBoxPosition.x;
        startY = textBoxPosition.y + textBoxSize.height / 2;
    }

    // Calculate end coordinates
    let endX = buttonClicked == "left-button" ? newPosition.x + averageMessageSize.x : newPosition.x;
    let endY = newPosition.y + averageMessageSize.y / 2;

    return this.createPath(startX, startY, endX, endY, buttonClicked);
}

  
  

createPath(startX: number, startY: number, endX: number, endY: number, buttonClicked: string): SVGPathElement | null {
  let controlX, controlY;

  const textBoxMiddleY = startY; // Middle Y of the textbox
  const messageMiddleY = endY;   // Middle Y of the message

  // Determine if the message is at the same vertical level as the textbox
  const isAtSameLevel = Math.abs(textBoxMiddleY - messageMiddleY) < 10; // Small threshold for being at the same level

  if (isAtSameLevel) {
    // If at the same level, create a straight line
    controlX = (startX + endX) / 2;
    controlY = (startY + endY) / 2;
  } else {
    // If not at the same level, create a curved line
    controlX = (startX + endX) / 2;

    if (messageMiddleY > textBoxMiddleY) {
      // Curve downwards if the message is below the textbox
      controlY = startY + (endY - startY) / 2 + 30;
    } else {
      // Curve upwards if the message is above the textbox
      controlY = startY - (startY - endY) / 2 - 30;
    }
  }

  // Create SVG and Path using D3
  const svg = d3.select('#mindMapSvg');

  const path = svg
    .append('path')
    .attr('d', `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`)
    .attr('stroke', 'black')
    .attr('fill', 'none');

  return path.node();
}






  calculateMindMapBounds(): { width: any; height: any } {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  updateSvgSize(MESSAGE_POSITION_INCREMENT: number): void {
    let { width, height } = this.calculateMindMapBounds();

    width += 1000;
    height += 1000;
    MESSAGE_POSITION_INCREMENT += 100;

    const parentContainer = document.getElementById('zoomContainer');

    if (parentContainer) {
      parentContainer.style.width = `${width}px`;
      parentContainer.style.height = `${height}px`;
    }

    const svg = d3.select('#mindMapSvg');

    svg.attr('width', width);
    svg.attr('height', height);
  }
}
