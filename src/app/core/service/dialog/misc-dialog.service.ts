import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
    DeletionDialogComponent,
    DeletionDialogData
} from '../../../shared/dialog/deletion-dialog/deletion-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MiscDialogService {

    constructor(
        private dialog: MatDialog
    ) {
    }

    startDeletionDialog(deletion?: DeletionDialogData): MatDialogRef<DeletionDialogComponent> {
        return this.dialog.open(DeletionDialogComponent, {
            data: deletion
        });
    }
}
