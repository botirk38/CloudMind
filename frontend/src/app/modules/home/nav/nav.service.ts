import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  calculatePopoverPosition(element: HTMLElement): { left: number, height: number, width: number } {
    return {
      left: element.offsetLeft,
      height: element.offsetHeight,
      width: element.offsetWidth
    };
  }
}
