import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';
import { Observable } from 'rxjs';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';
  }

  extractPdfContent(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let rawText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => {
                if ((<TextItem>item).str !== undefined) {
                  return (<TextItem>item).str;
                }
                return '';
              })
              .join(" ");
            rawText += pageText;
          }

          observer.next(rawText);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
