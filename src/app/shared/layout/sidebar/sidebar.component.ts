import { Component } from '@angular/core';
import {UserDialogService} from '../../../core/service/dialog/user-dialog.service';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false
})
export class SidebarComponent {

    constructor(
        private userDialogService: UserDialogService,
        private authService: AuthService
    ) {
    }

    onUserManagementClick() {
        this.userDialogService.openUserManagementDialog();
    }

    onLogoutClick() {
        this.authService.logout();
    }
}
