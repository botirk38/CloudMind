import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements AfterViewInit {

  @Input() message: string | undefined;

  @Output() messageChange = new EventEmitter<string>();
  @Output() buttonClicked = new EventEmitter<string>();


  showButtons = false;

  constructor(private layoutService:LayoutService) { }

  ngAfterViewInit(): void {
    this.layoutService.updateTextBoxPositionAndSize();
    console.log("Text Box Position:",this.layoutService.textBoxPosition);
    console.log("Text Box size:",this.layoutService.textBoxSize);
  }


  sendMessage(): void {
    if(this.message){
      console.log("Message sent: " + this.message);
      this.messageChange.emit(this.message);
      this.message = '';
      this.showButtons = true;
    }
  }

  buttonClick(buttonName: string): void {
    console.log("Button clicked: " + buttonName);
    this.buttonClicked.emit(buttonName);
    this.showButtons = false;
  }


}


  
  

