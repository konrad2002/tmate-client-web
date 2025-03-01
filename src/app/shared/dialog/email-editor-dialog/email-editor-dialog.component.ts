import {Component, Inject} from '@angular/core';
import {EmailEditorComponent} from '../../../content/email/email-editor/email-editor.component';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MemberModel} from '../../../core/model/member.model';
import {HelpDialogData} from '../help-dialog/help-dialog.component';

export interface EmailEditorDialogData {
    receivers: MemberModel[];
}

@Component({
    selector: 'app-email-editor-dialog',
    imports: [
        EmailEditorComponent,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './email-editor-dialog.component.html',
    styleUrl: './email-editor-dialog.component.scss',
    standalone: true
})
export class EmailEditorDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<EmailEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmailEditorDialogData,
    ) {
    }

    sendMail() {

    }
}
