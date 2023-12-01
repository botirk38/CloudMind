import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { ChatComponent } from './chat/chat.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageBoxComponent } from './message-box/message-box.component';
import { CardModule } from 'primeng/card';
import { CardComponent } from './card/card.component';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    VideoComponent,
    ChatComponent,
    MessageBoxComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ButtonModule
  ],
  exports: [
    VideoComponent,
    ChatComponent

  ]
})
export class SharedModule { }
