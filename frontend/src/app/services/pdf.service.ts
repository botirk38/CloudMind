import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private backendUrl = 'http://localhost:8080/upload';
  

  constructor(private http: HttpClient) {}

  getBackendUrl(): string {
    return this.backendUrl;
  }

  sendPdfToBackend(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.backendUrl, formData);
  }
}