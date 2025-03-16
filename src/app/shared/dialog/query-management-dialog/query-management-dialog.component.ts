import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {QueryManagerComponent} from '../../../content/query/query-manager/query-manager.component';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-query-management-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        QueryManagerComponent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './query-management-dialog.component.html',
    styleUrl: './query-management-dialog.component.scss',
    standalone: true
})
export class QueryManagementDialogComponent {

}
