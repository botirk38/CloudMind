import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MindMapComponent } from './mind-map/mind-map.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';


@NgModule({
  declarations: [
    AppComponent,
    MindMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGraphModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
