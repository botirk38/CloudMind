import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private backendUrl = 'http://localhost:8080/upload'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  sendPdfToBackend(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.backendUrl, formData);
  }
}