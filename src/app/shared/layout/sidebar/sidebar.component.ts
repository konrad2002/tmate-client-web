import { Component } from '@angular/core';
import {UserDialogService} from '../../../core/service/dialog/user-dialog.service';
import {AuthService} from '../../../core/service/auth.service';
import {MatIcon} from '@angular/material/icon';
import {HasPermissionDirective} from '../../../core/directive/has-permission.directive';
import {QueryDialogService} from '../../../core/service/dialog/query-dialog.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [
        MatIcon,
        HasPermissionDirective
    ],
    standalone: true
})
export class SidebarComponent {

    constructor(
        private userDialogService: UserDialogService,
        private queryDialogService: QueryDialogService,
        private authService: AuthService,
    ) {
    }

    onUserManagementClick() {
        this.userDialogService.openUserManagementDialog();
    }

    onLogoutClick() {
        this.authService.logout();
    }

    onQueryManagementClick() {
        this.queryDialogService.openQueryManagementDialog();
    }
}
