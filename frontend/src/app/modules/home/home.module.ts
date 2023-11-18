import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';
import { MobileNavComponent } from './nav/mobile-nav/mobile-nav.component';
import { HeroComponent } from './hero/hero.component';
import { PdfComponent } from './pdf/pdf.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    MobileNavComponent,
    HeroComponent,
    PdfComponent,
    HomeComponent

  ],
  imports: [
    CommonModule,
    AvatarGroupModule,
    AvatarModule,
    FileUploadModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
