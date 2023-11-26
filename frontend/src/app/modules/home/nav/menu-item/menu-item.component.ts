import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../desktop-nav/desktop-nav.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input() item: MenuItem | undefined;
  @Output() hover = new EventEmitter<MouseEvent>();
  
  onMouseEnter(event: MouseEvent): void {
    this.hover.emit(event);
  }
}
