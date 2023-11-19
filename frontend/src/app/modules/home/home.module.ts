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
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import { BenefitsComponent } from './benefits/benefits.component';
import { Card, CardModule } from 'primeng/card';
import { PlansComponent } from './plans/plans.component';

@NgModule({
  declarations: [
    MobileNavComponent,
    HeroComponent,
    PdfComponent,
    HomeComponent,
    BenefitsComponent,
    PlansComponent

  ],
  imports: [
    CommonModule,
    AvatarGroupModule,
    AvatarModule,
    FileUploadModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastModule,
    CardModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
