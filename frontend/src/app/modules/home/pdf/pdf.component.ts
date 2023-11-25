import { Component, OnDestroy } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
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
    if(this.fileToUpload){
      this.isLoading = true;
      this.pdfService
        .sendPdfToBackend(this.fileToUpload)
        .pipe(
          takeUntil(this.unsubscribe$),
          tap( response =>  {
            this.isLoading = false;
            this.error = "";
            console.log(response);
          })
        )
        .subscribe();
    }
  }
  
  handleFileInput(file: File) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    this.fileToUpload = file;
    this.error = "";
    this.uploadPDF();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
