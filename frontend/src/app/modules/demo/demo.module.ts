import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported here
import { CommonModule } from '@angular/common';







@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DemoModule { }
