import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputboxComponent } from './modules/chat/inputbox/inputbox.component';
import { ChatboxComponent } from './modules/chat/chatbox/chatbox.component';
import { MessageComponent } from './modules/chat/message/message.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InputboxComponent,
    ChatboxComponent,
    MessageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
