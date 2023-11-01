import { TestBed } from '@angular/core/testing';

import { PdfwrapperService } from './pdfwrapper.service';

describe('PdfwrapperService', () => {
  let service: PdfwrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfwrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
