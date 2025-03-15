import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeletionDialogComponent} from '../../../shared/dialog/deletion-dialog/deletion-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MiscDialogService {

    constructor(
        private dialog: MatDialog
    ) {
    }

    startDeletionDialog(): MatDialogRef<DeletionDialogComponent> {
        return this.dialog.open(DeletionDialogComponent, {

        });
    }
}
