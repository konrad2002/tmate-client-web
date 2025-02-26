import {Component, Inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface HelpDialogData {
    page: number;
}

@Component({
    selector: 'app-help-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './help-dialog.component.html',
    styleUrl: './help-dialog.component.scss',
    standalone: true
})
export class HelpDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<HelpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: HelpDialogData,
    ) {
    }
}
