import {Component} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-deletion-dialog',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        MatDialogTitle
    ],
    templateUrl: './deletion-dialog.component.html',
    styleUrl: './deletion-dialog.component.scss',
    standalone: true
})
export class DeletionDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeletionDialogComponent>,
    ) {
    }

    delete() {
        this.dialogRef.close(true)
    }
}
