import { Component } from '@angular/core';
import { NavService } from '../nav.service';

export interface MenuItem{
  title: string;
  subMenu: SubMenuItem[];

}

interface SubMenuItem{
  title: string;
  content: string;
}

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  styleUrls: ['./desktop-nav.component.css']
})
export class DesktopNavComponent {

  constructor(private navService: NavService) {}

  menuItems: MenuItem[] = [
  {
    title: 'Products',
    subMenu: [
      {
        title: 'Product 1',
        content: 'Details about Product 1...'
      },
      {
        title: 'Product 2',
        content: 'Details about Product 2. This product has a bit more content to test the responsiveness of the popover.'
      },
      {
        title: 'Product 3',
        content: 'Details about Product 3. This product has even more content to test the responsiveness of the popover. It includes several sentences of text to ensure that the popover can handle larger amounts of content.'
      },
      // ... more products ...
    ]
  },
  {
    title: 'Services',
    subMenu: [
      {
        title: 'Service 1',
        content: 'Details about Service 1...'
      },
      {
        title: 'Service 2',
        content: 'Details about Service 2. This service has a bit more content to test the responsiveness of the popover.'
      },
     
      // ... more services ...
    ]
  },
  // ... more menu items ...
];
  

  hovering: number | null = null;
  popoverLeft: number | null = null;
  popoverHeight: number | null = null;
  popoverWidth: number | null = null;
  popOverTitle: string[] | null = null;
  popOverContent: string[] | null = null;

  onMouseEnter(linkIndex: number, event: MouseEvent): void {
    this.hovering = linkIndex;
    const position = this.navService.calculatePopoverPosition(event.target as HTMLElement);
    this.popoverLeft = position.left;
    this.popoverHeight = position.height;
    this.popoverWidth = position.width;

    const link = this.menuItems[linkIndex];
    this.popOverTitle = link.subMenu.map(subMenu => subMenu.title);
    this.popOverContent = link.subMenu.map(subMenu => subMenu.content);

  }
  

  onMouseLeave(): void {
    this.hovering = null;
    this.popOverTitle = null;
    this.popOverContent = null;
  }




}