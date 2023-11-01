import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ChatboxComponent } from './modules/chat/chatbox/chatbox.component';
import { InputboxComponent } from './modules/chat/inputbox/inputbox.component';
import { FormsModule } from '@angular/forms';
import { SendBtnComponent } from './components/buttons/send-btn/send-btn.component';
import { PdfComponent } from './modules/pdf/pdf.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { MobileNavComponent } from './modules/home/nav/mobile-nav/mobile-nav.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule, HttpClientModule, FileUploadModule],
    declarations: [AppComponent,
      ChatboxComponent,
      InputboxComponent,
      SendBtnComponent,
      PdfComponent,
      MobileNavComponent

    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chatToPDF'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chatToPDF');
  });

 
});
