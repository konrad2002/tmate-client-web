import {Component, Inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface DeletionDialogData {
    title?: string;
    description?: string;
    buttonText?: string;
}

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
        @Inject(MAT_DIALOG_DATA) public data: DeletionDialogData
    ) {
        if (!this.data.title) {
            this.data.title = "Löschen?";
            this.data.description = "Möchtest du diesen Eintrag wirklich löschen?";
            this.data.buttonText = "Löschen";
        }
    }

    delete() {
        this.dialogRef.close(true)
    }
}
