import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputboxComponent } from './modules/chat/inputbox/inputbox.component';
import { ChatboxComponent } from './modules/chat/chatbox/chatbox.component';
import { MessageComponent } from './modules/chat/message/message.component';
import { FormsModule } from '@angular/forms';
import { PdfComponent } from './modules/pdf/pdf.component';
import { SendBtnComponent } from './components/buttons/send-btn/send-btn.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MobileNavComponent } from './modules/home/nav/mobile-nav/mobile-nav.component';
import { HeroComponent } from './modules/home/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    InputboxComponent,
    ChatboxComponent,
    MessageComponent,
    PdfComponent,
    SendBtnComponent,
    SendBtnComponent,
    MobileNavComponent,
    HeroComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FileUploadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
