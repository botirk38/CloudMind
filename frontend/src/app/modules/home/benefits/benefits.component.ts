import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent {
  benefits: { header: string; subheader: string; image: string; description: string; }[] | undefined;
  
  ngOnInit(): void {
    this.benefits = [
      {
        header: 'Collaboration',
        subheader: 'Work together on PDFs',
        image: 'https://primefaces.org/cdn/primeng/images/usercard.png',
        description:
          'Work together with your team on PDFs in real-time, no matter where you are.',
      },
      {
        header: 'AI Powered',
        subheader: 'Make your PDFs smarter',
        image: 'https://primefaces.org/cdn/primeng/images/usercard.png',
        description:
          'Leverage the power of AI to make your collaboration more efficient and productive.',
      },
      {
        header: 'Easy Conversion',
        subheader: 'Convert chats into PDFs',
        image: 'https://primefaces.org/cdn/primeng/images/usercard.png',
        description: 'Convert your chats into PDFs with a click of a button.',
      },
      {
        header: 'Secure',
        subheader: 'Your data is safe with us',
        image: 'https://primefaces.org/cdn/primeng/images/usercard.png',
        description:
          'We take security very seriously. Your data is safe with us.',
      },
    ];
  }
}
