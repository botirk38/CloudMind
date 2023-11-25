import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';

interface Message {
  text: string;
  date: Date;
  author: 'user' | 'AI';
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  constructor(private pdfService: PdfService, private http: HttpClient) {}

  messages: Message[] | undefined;
  samplePDF = '/assets/sample.pdf';

  ngOnInit(): void {
    this.messages = [];
    this.http.get(this.samplePDF, { responseType: 'blob' }).subscribe(blob => {
      const file = new File([blob], 'sample.pdf', { type: 'application/pdf' });
      this.pdfService.sendPdfToBackend(file).subscribe(response => {
        next: (response: any) => {
          console.log(response);
        };
        err: (error: any) => {
          console.log(error);
        }
      });
    });
  }
  addMessage(text: string, author: 'user' | 'AI'): void {
    const message = {
      text,
      date: new Date(),
      author,
    };
    this.messages?.push(message);
  }

}
