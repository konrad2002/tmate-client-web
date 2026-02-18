import {Component, inject} from '@angular/core';
import {FieldService} from '../../../core/service/api/field.service';
import {FieldModel, fieldTypes} from '../../../core/model/field.model';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-field-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MatSlideToggle,
        MatSelect,
        MatOption
    ],
  templateUrl: './field-dialog.component.html',
  styleUrl: './field-dialog.component.scss'
})
export class FieldDialogComponent {
    private fieldService: FieldService = inject(FieldService)
    private snackBar: MatSnackBar = inject(MatSnackBar);

    field: FieldModel = {} as FieldModel;

    constructor(
        public dialogRef: MatDialogRef<FieldDialogComponent>,
    ) {
    }

    createField() {
        this.fieldService.addField(this.field).subscribe({
            next: (result) => {
                this.snackBar.open("Spalte angelegt!")
                this.dialogRef.close(result)
            }, error: _ => {
                this.snackBar.open("Spalte anlegen fehlgeschlagen!")
            }
        });
    }

    protected readonly fieldTypes = fieldTypes;
}
