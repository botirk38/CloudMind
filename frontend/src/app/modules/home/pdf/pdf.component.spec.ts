import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PdfComponent } from './pdf.component';
import { PdfService } from 'src/app/services/pdf.service';
import { of, throwError } from 'rxjs';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';


describe('PdfComponent', () => {
  let component: PdfComponent;
  let fixture: ComponentFixture<PdfComponent>;
  let pdfService: PdfService;
  let pdfServiceSpy: jasmine.SpyObj<PdfService>;

  
  beforeEach(waitForAsync(() => {
    pdfServiceSpy = jasmine.createSpyObj('PdfService', ['extractPdfContent', 'sendToBackend']);

    TestBed.configureTestingModule({
      declarations: [ PdfComponent ],
      imports: [ FileUploadModule, HttpClientModule ],
      providers: [ { provide: PdfService, useValue: pdfServiceSpy } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfComponent);
    component = fixture.componentInstance;
    pdfService = TestBed.inject(PdfService);
    fixture.detectChanges();
  });

 

});


