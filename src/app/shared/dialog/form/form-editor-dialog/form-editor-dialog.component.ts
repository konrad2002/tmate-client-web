import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormDefaults, FormGroup, FormModel} from '../../../../core/model/form.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {FormService} from '../../../../core/service/api/form.service';
import {PartialObserver} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MiscDialogService} from '../../../../core/service/dialog/misc-dialog.service';
import {MatButton} from '@angular/material/button';
import {FieldModel} from '../../../../core/model/field.model';
import {FieldService} from '../../../../core/service/api/field.service';
import {SpinnerComponent} from '../../../elements/spinner/spinner.component';
import {FormsModule} from '@angular/forms';
import {FormEditorComponent} from '../../../../content/form/form-editor/form-editor.component';

export interface FormEditorDialogData {
    form: FormModel;
    edit: boolean;
}

@Component({
  selector: 'app-form-editor-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        SpinnerComponent,
        FormsModule,
        FormEditorComponent
    ],
  templateUrl: './form-editor-dialog.component.html',
  styleUrl: './form-editor-dialog.component.scss'
})
export class FormEditorDialogComponent implements OnInit {
    private formService: FormService = inject(FormService);
    private fieldService: FieldService = inject(FieldService);
    private snackBar: MatSnackBar = inject(MatSnackBar);
    private miscDialogService: MiscDialogService = inject(MiscDialogService);

    fetching = 0;

    fields: FieldModel[] = [];

    constructor(
        public dialogRef: MatDialogRef<FormEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormEditorDialogData,
    ) {
        if (!this.data.edit) {
            this.data.form = {
                form_groups: [] as FormGroup[],
                defaults: [] as FormDefaults[],
            } as FormModel;
        }
    }

    ngOnInit() {
        this.fetching++;
        this.fieldService.getFields().subscribe(fields => {
            this.fields = fields;
            this.fetching--;
        })
        // TODO: fetch form again from service by id
    }


    saveForm() {
        if (this.data.edit) {
            this.formService.updateForm(this.data.form).subscribe(this.handleAfterSave)
        } else {
            this.formService.addForm(this.data.form).subscribe(this.handleAfterSave);
        }
    }

    handleAfterSave: PartialObserver<FormModel> = {
        next: query => {
            this.snackBar.open("Formular gespeichert!");
            this.dialogRef.close(query);
        },
        error: _ => {
            this.snackBar.open("Fehler beim Speichern des Formulars!");
        }
    }

    deleteForm() {
        this.miscDialogService.startDeletionDialog().afterClosed().subscribe(del => {
            if (del) {
                this.formService.removeFormById(this.data.form.id).subscribe({
                    next: query => {
                        this.snackBar.open("Formular gelöscht!");
                        this.dialogRef.close(query);
                    },
                    error: _ => {
                        this.snackBar.open("Fehler beim Löschen des Formulars!");
                    }
                })
            }
        })
    }
}
