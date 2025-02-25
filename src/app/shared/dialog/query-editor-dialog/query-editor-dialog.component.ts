import {Component, Inject} from '@angular/core';
import {QueryModel} from '../../../core/model/query.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {QueryEditorComponent} from '../../../content/query-editor/query-editor.component';

export interface QueryEditorDialogData {
    query: QueryModel;
    edit: boolean;
}
@Component({
    selector: 'app-query-editor-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        QueryEditorComponent
    ],
    templateUrl: './query-editor-dialog.component.html',
    styleUrl: './query-editor-dialog.component.scss',
    standalone: true,
})
export class QueryEditorDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<QueryEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: QueryEditorDialogData,
    ) {
    }

    saveQuery() {
        // TODO
    }
}
