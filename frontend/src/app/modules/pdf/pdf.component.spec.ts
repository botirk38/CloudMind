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

  it("should call extractPDFContent when a file is selected", () =>{
    const mockFile = new File([''], 'test.pdf', {type:'application/pdf'});
   

    pdfServiceSpy.extractPdfContent.and.returnValue(of('Extracted text'));

    component.handleFileInput(mockFile);

    component.uploadPDF();

    expect(pdfService.extractPdfContent).toHaveBeenCalledWith(mockFile);
  });

  it("should call sendToBackend when uploadPDF is called", () =>{
    const mockText = "Extracted text";
    const mockFile = new File([''], 'test.pdf', {type:'application/pdf'});

    pdfServiceSpy.extractPdfContent.and.returnValue(of(mockText));
    pdfServiceSpy.sendToBackend.and.returnValue(of({}));

    component.fileToUpload = mockFile;

    component.uploadPDF();

    fixture.whenStable().then( () => {
      expect(pdfService.sendToBackend).toHaveBeenCalledWith(mockText);
    });
  })

  it("Should handle errors if PDF extraction fails" , waitForAsync(() =>{
    const mockFile = new File([''], 'test.pdf', {type:'application/pdf'});
    pdfServiceSpy.extractPdfContent.and.returnValue(throwError(() => new Error('Error extracting PDF')));

    component.fileToUpload = mockFile;
    component.uploadPDF();

    fixture.whenStable().then( () => {
      expect(component.error).toBe("Error extracting PDF");
    })
  }));

});


