import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {UserManagerComponent} from '../../../../content/user/user-manager/user-manager.component';

@Component({
    selector: 'app-user-list-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        UserManagerComponent
    ],
    templateUrl: './user-list-dialog.component.html',
    styleUrl: './user-list-dialog.component.scss',
    standalone: true
})
export class UserListDialogComponent {

}
