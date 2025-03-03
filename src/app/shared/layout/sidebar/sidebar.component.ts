import { Component } from '@angular/core';
import {UserDialogService} from '../../../core/service/dialog/user-dialog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false
})
export class SidebarComponent {

    constructor(
        private userDialogService: UserDialogService
    ) {
    }

    onUserManagementClick() {
        this.userDialogService.openUserManagementDialog();
    }
}
