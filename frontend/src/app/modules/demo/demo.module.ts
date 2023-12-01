import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    SharedModule
  ]
})
export class DemoModule { }
