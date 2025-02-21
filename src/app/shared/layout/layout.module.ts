import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent
  ],
  exports: [
    ToolbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
