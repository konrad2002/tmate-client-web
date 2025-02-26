import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainComponent} from './main/main.component';
import {MatIcon} from "@angular/material/icon";
import {ToolbarButtonComponent} from "./toolbar/toolbar-button/toolbar-button.component";
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MainTableComponent} from '../../content/table/main-table/main-table.component';


@NgModule({
    declarations: [
        SidebarComponent,
        MainComponent
    ],
    exports: [
        SidebarComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        MatIcon,
        ToolbarButtonComponent,
        ToolbarComponent,
        MainTableComponent
    ]
})
export class LayoutModule {
}
