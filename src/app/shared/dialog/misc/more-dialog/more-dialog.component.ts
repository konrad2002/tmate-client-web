import {Component, Inject} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface MoreDialogData {
    title?: string;
    description?: string;
    listItems?: string[];
}
@Component({
  selector: 'app-more-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatButton,
        MatDialogActions,
        MatDialogClose
    ],
  templateUrl: './more-dialog.component.html',
  styleUrl: './more-dialog.component.scss'
})
export class MoreDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<MoreDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MoreDialogData
    ) {
        if (!this.data.title) {
            this.data.title = "Details";
            this.data.description = "Hier findest du weitere Informationen zu diesem Eintrag.";
            this.data.listItems = [];
        }
    }

}
