import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { MessageService } from 'src/app/services/message.service';
import { MessageCard } from 'src/app/models/MessageCard';

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
  messages: Message[] | undefined;
  samplePDF = '/assets/sample.pdf';

  constructor(private pdfService: PdfService, private http: HttpClient, public messageService: MessageService) {}
 

  ngOnInit(): void {
    this.messages = [];
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

  onMessageCardClicked(messageCard: MessageCard) {
    this.messageService.activeMessageId.next(messageCard.id);
    console.log("New message id:", this.messageService.activeMessageId.getValue());
  }

  onMessageCardUnSelected() {
    console.log("Unselected");
    this.messageService.activeMessageId.next(null);
    console.log("Demo component:", this.messageService.activeMessageId.getValue());

  }

  


}
