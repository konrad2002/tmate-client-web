import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainTableComponent} from './main-table/main-table.component';
import {MatIcon} from "@angular/material/icon";



@NgModule({
  declarations: [
    MainTableComponent
  ],
  imports: [
    CommonModule,
    MatIcon,
  ],
  exports: [
    MainTableComponent
  ]
})
export class TableModule { }
