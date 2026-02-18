import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
    TableStructureDialogComponent
} from '../../../shared/dialog/table-structure-dialog/table-structure-dialog.component';
import {FieldDialogComponent} from '../../../shared/dialog/field-dialog/field-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TableStructureDialogService {
    private dialog: MatDialog = inject(MatDialog);

    openTableStructureDialog() {
        this.dialog.open(TableStructureDialogComponent, {
            width: '95%',
            maxWidth: '1500px'
        })
    }

    openFieldDialog() {
        this.dialog.open(FieldDialogComponent, {
            width: '50%',
            maxWidth: '500px'
        });
    }
}
