import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/service/auth.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {MainTableComponent} from '../../../content/table/main-table/main-table.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [
        SidebarComponent,
        ToolbarComponent,
        MainTableComponent
    ],
    standalone: true
})
export class MainComponent implements OnInit{

    constructor(
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.authService.fetchUser();
    }
}
