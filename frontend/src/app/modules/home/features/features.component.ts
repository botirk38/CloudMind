import { Component, OnInit } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  features: Feature[] = [
    {
      title: 'Chat to PDF',
      description: 'Convert your chats to PDF for easy sharing and archiving.',
      image: '/assets/images/feature-1.webp'
    },
    {
      title: 'Collaboration',
      description: 'Work together with your team in real time.',
      image: '/assets/images/feature-2.webp'
    },
    {
      title: 'Innovative Features',
      description: 'Experience the latest in AI technology with our innovative features.',
      image: '/assets/images/feature-3.webp'
    },
    {
      title: 'Easy User Experience',
      description: 'Our intuitive design makes it easy for anyone to use.',
      image: '/assets/images/feature-4.webp'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}