import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { AppRoutingModule } from './modules/app-routing-module/app-routing.module';
import { FormsModule } from '@angular/forms';
import { DemoModule } from './modules/demo/demo.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    DemoModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
