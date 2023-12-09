import { Injectable } from '@angular/core';
import { Coordinates } from '../models/MessageCard';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() { }

  drawLineToMessage(newPosition: Coordinates, textBoxPosition: Coordinates, textBoxSize: {width: number, height:number}, averageMessageSize: {x: number, y: number}): SVGPathElement | null {

    let startX: number;
    let startY: number;

    const textBoxMiddleY = textBoxPosition.y + textBoxSize.height / 2;
    const messageMiddleY = newPosition.y + averageMessageSize.y / 2;

    // Determine if the message is at the same vertical level as the textbox
    const isAtSameLevel =
      Math.abs(textBoxMiddleY - messageMiddleY) <=
      averageMessageSize.y;

    if (isAtSameLevel) {
      // Start from the right middle of the textbox
      startX = textBoxPosition.x + textBoxSize.width / 2;
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
    const endY = newPosition.y + averageMessageSize.y / 2;

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
   const svg = d3.select('#mindMapSvg');

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
    textBoxPosition: Coordinates,
    textBoxSize: { width: number; height: number },
    averageMessageSize: { x: number; y: number }
  
  ): void {

    let startX: number;
    let startY: number;

    const textBoxMiddleY = textBoxPosition.y + textBoxSize.height / 2;
    const endY = messagePosition.y + averageMessageSize.y / 2;

    if (Math.abs(textBoxMiddleY - endY) <= averageMessageSize.y / 4) {
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

  calculateMindMapBounds(): { width: any; height: any; } {
    return {width: window.innerWidth, height: window.innerHeight};
  }

  updateSvgSize(MESSAGE_POSITION_INCREMENT: number, ) : void {
    let {width, height} = this.calculateMindMapBounds();

    width+= 1000;
    height+= 1000;
    MESSAGE_POSITION_INCREMENT+=100;

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
