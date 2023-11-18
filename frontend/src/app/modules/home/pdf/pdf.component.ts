import { Component, OnDestroy } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [MessageService]
})
export class PdfComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  fileToUpload: File | null = null;
  isLoading = false;
  error = "";

  constructor(private pdfService: PdfService, private messageService : MessageService) {}

  uploadPDF() {
    if (this.fileToUpload) {
      this.isLoading = true;
      this.pdfService.extractPdfContent(this.fileToUpload).pipe(
        switchMap(text => this.pdfService.sendToBackend(text)),
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Upload Success', detail: 'PDF processed successfully' });
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
  }
  
  handleFileInput(file: File) {
    this.fileToUpload = file;
    this.error = "";
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
