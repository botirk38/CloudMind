import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent {
  @Input() left: number | null = null;
  @Input() height: number | null = null;
  @Input() width: number | null = null;
  @Input() isVisible: boolean = false;
  @Input() titles: string[] | null = null;
  @Input() contents: string[] | null = null;
}
