import {inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MemberEvent} from '../../model/event/member-event.model';
import {MatDialog} from '@angular/material/dialog';
import {
    FormEditorDialogComponent,
    FormEditorDialogData
} from '../../../shared/dialog/form/form-editor-dialog/form-editor-dialog.component';
import {FormModel} from '../../model/form.model';
import {FormService} from '../api/form.service';

@Injectable({
    providedIn: 'root'
})
export class FormDialogService {
    private dialog: MatDialog = inject(MatDialog);
    private formService: FormService = inject(FormService);

    openFormEditDialog(edit: boolean, form?: FormModel, eventSubject?: Subject<MemberEvent>) {
        const dialogRef = this.dialog.open(FormEditorDialogComponent, {
            width: '95%',
            maxWidth: '950px',
            data: {
                edit: edit,
                form: form
            } as FormEditorDialogData,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.formService.fetchForms();
            console.log(result)
            eventSubject?.next(result);
        });
    }
}
