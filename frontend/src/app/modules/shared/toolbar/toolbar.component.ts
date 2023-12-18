import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  toolBarItems: { menuItems: MenuItem[] } | undefined;

  ngOnInit() {
    this.toolBarItems = {
      menuItems: [
        {
          label: 'Zoom In',
          icon: PrimeIcons.PLUS,
          onClick: this.onZoomIn,
        },
        {
          label: 'Zoom Out',
          icon: PrimeIcons.MINUS,
          onClick: this.onZoomOut
        }
      ]
    };
  }

  onZoomIn(){
    console.log("Zoom In");
  }

  onZoomOut(){
    console.log("Zoom Out");
  }


}

