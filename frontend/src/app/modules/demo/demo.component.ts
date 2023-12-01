import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { MessageService } from 'src/app/services/message.service';

export interface Message {
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

  constructor(private pdfService: PdfService, private http: HttpClient, public messageService: MessageService) {}
 

  ngOnInit(): void {
    this.messages = [];
    this.message = '';
    this.initializeSamplePdf();
    
  }

  initializeSamplePdf(): void {
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

  onMessageReceived(message: string){
    const newPos = {x: 0, y: 0};
    console.log("Message received: " + message);

    this.messageService.addMessageParent(message, 'user', newPos);
    console.log(this.messageService.messages);
  }


}
