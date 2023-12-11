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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarComponent } from './toolbar/toolbar.component'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ChildCardComponent } from './child-card/child-card.component';



@NgModule({
  declarations: [
    VideoComponent,
    ChatComponent,
    MessageBoxComponent,
    CardComponent,
    ToolbarComponent,
    ChildCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
    MatButtonModule,
    MatIconModule

  ],
  exports: [
    VideoComponent,
    ChatComponent,
    CardComponent

  ]
})
export class SharedModule { }
