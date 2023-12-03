import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  averageMessageSize= {x:400, y:272};
  textBoxPosition = {x:0, y:0};
  textBoxSize = {width:0, height:0};

  setTextBoxPositionAndSize(x: number, y: number){
    const textBox = document.getElementById('textBox');
    if(textBox){
      const textBoxRect = textBox.getBoundingClientRect();
      this.textBoxPosition = {x: textBoxRect.left, y: textBoxRect.top};
      this.setTextBoxSize(textBoxRect.width, textBoxRect.height);
    }
  }

  setTextBoxSize(width: number, height: number){
    this.textBoxSize = {width, height};
  }



  getTextBoxPosition(){
    return this.textBoxPosition;
  }

  getTextBoxSize(){
    return this.textBoxSize;
  }

  isPositionAvailable(position: {x: number, y: number}): boolean {
    const { x, y } = position;
    const { x: textBoxX, y: textBoxY } = this.getTextBoxPosition();
    const { width: textBoxWidth, height: textBoxHeight } = this.getTextBoxSize();
    const { x: messageWidth, y: messageHeight } = this.averageMessageSize;
  
    const isWithinTextBoxHorizontally = x >= textBoxX && x + messageWidth <= textBoxX + textBoxWidth;
    const isWithinTextBoxVertically = y >= textBoxY && y + messageHeight <= textBoxY + textBoxHeight;
  
    return isWithinTextBoxHorizontally && isWithinTextBoxVertically;
  }
}
