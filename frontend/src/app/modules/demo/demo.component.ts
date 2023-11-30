import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import Typed from 'typed.js';


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
export class DemoComponent implements OnInit {
  message : string | undefined;
  messages: Message[] | undefined;
  samplePDF = '/assets/sample.pdf';

  constructor(private pdfService: PdfService, private http: HttpClient) {}
  initializeTyped(): void {
    const options = {
      strings: ["ChatPDF", "Crafted with Cutting-Edge AI"],
      loop: true,
      typeSpeed: 50,
      backSpeed: 25
    };

    new Typed('.multiText', options);
  }

  ngOnInit(): void {
    this.initializeTyped();
    this.messages = [];
    this.http.get(this.samplePDF, { responseType: 'blob' }).subscribe(blob => {
      const file = new File([blob], 'sample.pdf', { type: 'application/pdf' });
      this.pdfService.sendPdfToBackend(file).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    });
  }
        

}
