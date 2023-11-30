import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    VideoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VideoComponent
  ]
})
export class SharedModule { }
