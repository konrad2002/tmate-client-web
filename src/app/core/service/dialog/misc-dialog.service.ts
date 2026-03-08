import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
    DeletionDialogComponent,
    DeletionDialogData
} from '../../../shared/dialog/deletion-dialog/deletion-dialog.component';
import {MoreDialogComponent, MoreDialogData} from '../../../shared/dialog/misc/more-dialog/more-dialog.component';

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

    openMoreDialog(data: MoreDialogData) {
        this.dialog.open(MoreDialogComponent, {
            data: data
        })
    }
}
