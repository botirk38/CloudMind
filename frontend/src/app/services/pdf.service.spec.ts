import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import * as pdfjsLib from 'pdfjs-dist';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PdfwrapperService } from './pdfwrapper.service';

describe('PdfService', () => {
  let service: PdfService;
  let mockFileReader: jasmine.SpyObj<FileReader>;
  let httpTestingController: HttpTestingController;
  let pdfwrapperService: jasmine.SpyObj<PdfwrapperService>;


  beforeEach(() => {
    pdfwrapperService = jasmine.createSpyObj('PdfwrapperService', ['getDocument']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PdfService,
      { provide: PdfwrapperService, useValue: pdfwrapperService}
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PdfService);

    mockFileReader = jasmine.createSpyObj('FileReader', ['readAsArrayBuffer', 'onload', 'onerror']);
    spyOn(window as any, 'FileReader').and.returnValue(mockFileReader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(  () => { 
    httpTestingController.verify();
  });

  it('should extract content from pdf', (done: DoneFn) => {
    const testFile = new File([""], "test.pdf", { type: "application/pdf" });
    const mockText = "Extracted PDF text";
    const mockPdf: Partial<pdfjsLib.PDFDocumentProxy> = {
      numPages: 1,
      getPage: jasmine.createSpy().and.returnValue(Promise.resolve({
        getTextContent: () => Promise.resolve({
          items: [{ str: mockText }],
        }),
      })),

    }

      pdfwrapperService.getDocument.and.returnValue({ 
      promise: Promise.resolve(mockPdf), 
      
    } as unknown as pdfjsLib.PDFDocumentLoadingTask );

    service.extractPdfContent(testFile).subscribe({
      next: text => {
        expect(text).toBe(mockText);
        done();
      },
      error: done.fail
    });

    if (mockFileReader.onload) {
      mockFileReader.onload({ target: { result: new ArrayBuffer(8) } } as any);
    }
    
  });

  it('should handle file read errors', (done: DoneFn) => {
    const testFile = new File([""], "test.pdf", { type: "application/pdf" });
    const readError = new ProgressEvent('error');

    service.extractPdfContent(testFile).subscribe({
      next: () => done.fail('Should have failed with file read error'),
      error: error => {
        expect(error).toBe(readError);
        done();
      }
    });

    if(mockFileReader.onerror) {
      mockFileReader.onerror(readError as ProgressEvent<FileReader>);
    }
  });

  it('should handle PDF.js errors', (done: DoneFn) => {
    const testFile = new File([""], "test.pdf", { type: "application/pdf" });
    const pdfjsError = new Error('PDF.js error');

    pdfwrapperService.getDocument.and.returnValue({ 
      promise: Promise.reject(pdfjsError), 

    } as unknown as pdfjsLib.PDFDocumentLoadingTask )

    service.extractPdfContent(testFile).subscribe({
      next: () => done.fail('Should have failed with PDF.js error'),
      error: error => {
        expect(error).toBe(pdfjsError);
        done();
      }
    });
    if(mockFileReader.onload) {
      mockFileReader.onload({ target: { result: new ArrayBuffer(8) } } as any);
    }
  });

});
