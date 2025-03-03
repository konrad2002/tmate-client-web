import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserListDialogComponent} from '../../../shared/dialog/user/user-list-dialog/user-list-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {

    constructor(
        private dialog: MatDialog
    ) {
    }

    openUserManagementDialog() {
        this.dialog.open(UserListDialogComponent, {
            width: '95%',
            maxWidth: '950px',
        })
    }
}
