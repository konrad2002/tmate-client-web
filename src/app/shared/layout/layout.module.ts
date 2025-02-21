import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainComponent} from './main/main.component';
import {ContentModule} from '../../content/content.module';
import {MatIcon} from "@angular/material/icon";


@NgModule({
    declarations: [
        ToolbarComponent,
        SidebarComponent,
        MainComponent
    ],
    exports: [
        ToolbarComponent,
        SidebarComponent,
        MainComponent
    ],
  imports: [
    CommonModule,
    ContentModule,
    MatIcon
  ]
})
export class LayoutModule {
}
