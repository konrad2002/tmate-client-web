import { Injectable } from '@angular/core';
import {MemberModel} from '../model/member.model';
import {Subject} from 'rxjs';
import {MemberEvent} from '../model/event/member-event.model';
import {MatDialog} from '@angular/material/dialog';
import {
    MemberDetailDialogComponent,
    MemberDetailDialogData
} from '../../shared/dialog/member-detail-dialog/member-detail-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MemberDialogService {

    constructor(
        private dialog: MatDialog,
    ) {
    }

    openMemberDetailDialog(edit: boolean, member?: MemberModel, eventSubject?: Subject<MemberEvent>) {
        const dialogRef = this.dialog.open(MemberDetailDialogComponent, {
            width: '95%',
            maxWidth: '950px',
            data: {
                edit: edit,
                member: member
            } as MemberDetailDialogData,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            eventSubject?.next(result);
        });
    }
}
