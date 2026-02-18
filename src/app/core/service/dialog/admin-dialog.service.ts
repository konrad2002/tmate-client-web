import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AdminDialogComponent} from '../../../shared/dialog/admin-dialog/admin-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AdminDialogService {

    constructor(
        private dialog: MatDialog
    ) {
    }

    openAdminDialog() {
        this.dialog.open(AdminDialogComponent, {
            width: '95%',
            maxWidth: '1500px'
        })
    }
}
