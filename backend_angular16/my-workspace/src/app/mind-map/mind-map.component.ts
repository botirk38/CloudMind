import { Component } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';


@Component({
  selector: 'app-mind-map',
  templateUrl: './mind-map.component.html',
  styleUrls: ['./mind-map.component.css']
})
export class MindMapComponent {
  nodes = [
    { id: '1', label: 'Root Node' },
    { id: '2', label: 'Child Node 1' },
    { id: '3', label: 'Child Node 2' }
  ];

  links = [
    { source: '1', target: '2' },
    { source: '1', target: '3' }
  ];

}
