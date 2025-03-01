import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
    EmailEditorDialogComponent,
    EmailEditorDialogData
} from '../../../shared/dialog/email-editor-dialog/email-editor-dialog.component';
import {MemberModel} from '../../model/member.model';

@Injectable({
    providedIn: 'root'
})
export class EmailDialogService {

    constructor(
        private dialog: MatDialog
    ) {
    }

    openEMailEditorDialog(receivers: MemberModel[]) {
        this.dialog.open(EmailEditorDialogComponent, {
            width: '95%',
            maxWidth: '1500px',
            data: {
                receivers: receivers
            } as EmailEditorDialogData
        })
    }

}
