import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
  ]
})
export class DemoModule { }
