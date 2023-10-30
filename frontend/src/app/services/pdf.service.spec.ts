import { TestBed } from '@angular/core/testing';

import { PdfService } from './pdf.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PdfService', () => {
  let service: PdfService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PdfService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should extract content from pdf.", (done: DoneFn) => {
    const testFile = new File([""], "test.pdf", {type: "application/pdf"});

    service.extractContent(testFile).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data).toEqual("Test content");
      done();
    });

    httpTestingController.verify();

  });

  it("should return error if file is not pdf.", (done: DoneFn) => {
    const testFile = new File([""], "test.txt", {type: "text/plain"});

    service.extractContent(testFile).subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });

    httpTestingController.verify();

  });

});
