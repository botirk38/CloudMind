import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PdfService } from './pdf.service';

describe('PdfService', () => {
  let service: PdfService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PdfService]
    });

    service = TestBed.inject(PdfService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should send the PDF to the backend', () => {
    const mockFile = new File([''], 'filename', { type: 'application/pdf' });
    const mockResponse = { status: 'success' };

    service.sendPdfToBackend(mockFile).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.getBackendUrl());
    expect(req.request.method).toBe('POST');

    const formData = new FormData();
    formData.append('file', mockFile);

    expect(req.request.body).toEqual(formData);

    req.flush(mockResponse); // Provide dummy values as a response
  });
});