import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { MessageComponent } from './message/message.component';
import { InputboxComponent } from './inputbox/inputbox.component';


@NgModule({
  declarations: [
    ChatboxComponent,
    MessageComponent,
    InputboxComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
