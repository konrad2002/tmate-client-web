import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainTableComponent} from './main-table/main-table.component';



@NgModule({
  declarations: [
    MainTableComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MainTableComponent
  ]
})
export class TableModule { }
