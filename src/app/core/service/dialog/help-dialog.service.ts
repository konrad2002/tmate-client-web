import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HelpDialogComponent, HelpDialogData} from '../../../shared/dialog/help-dialog/help-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class HelpDialogService {

    constructor(
        private dialog: MatDialog
    ) {
    }

    openHelp(page: number) {
        this.dialog.open(HelpDialogComponent, {
            width: '50%',
            maxWidth: '950px',
            data: {
                page: page
            } as HelpDialogData,
        });
    }

}
