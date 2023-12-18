import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor() { }

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
}
