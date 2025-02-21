import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component';
import {ContentModule} from './content/content.module';
import {LayoutModule} from './shared/layout/layout.module';
import {RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ContentModule,
    LayoutModule,
    RouterOutlet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
