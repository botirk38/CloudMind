import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfwrapperService {

  getDocument(url: any){
    return pdfjsLib.getDocument(url);
  }
}
