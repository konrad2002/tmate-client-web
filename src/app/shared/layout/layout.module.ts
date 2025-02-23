import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainComponent} from './main/main.component';
import {ContentModule} from '../../content/content.module';
import {MatIcon} from "@angular/material/icon";
import {ToolbarButtonComponent} from "./toolbar/toolbar-button/toolbar-button.component";
import {ToolbarComponent} from './toolbar/toolbar.component';


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
        ContentModule,
        MatIcon,
        ToolbarButtonComponent,
        ToolbarComponent
    ]
})
export class LayoutModule {
}
