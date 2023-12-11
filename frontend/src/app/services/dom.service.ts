import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DOMService {

  constructor() { }

  getElementRect(elementId: string): DOMRect | undefined {
    const element = document.getElementById(elementId);
    return element ? element.getBoundingClientRect() : undefined;
  }

  setElementStyle(elementId: string, styles:{[key: string] : string}) : void {
    const element = document.getElementById(elementId);
    if(element){
      for(let key in styles){
        element.style.setProperty(key, styles[key]);
      }
    }
  }
}
