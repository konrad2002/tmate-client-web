import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MemberModel} from '../../model/member.model';
import {MemberDialogComponent, MemberDialogData} from '../../../shared/dialog/member-dialog/member-dialog.component';
import {Subject} from 'rxjs';
import {MemberEvent} from '../../model/event/member-event.model';
import {
    MemberDetailDialogComponent,
    MemberDetailDialogData
} from '../../../shared/dialog/member-detail-dialog/member-detail-dialog.component';
import {SearchDialogComponent} from '../../../shared/dialog/search-dialog/search-dialog.component';
import {
    MemberCreationDialogComponent, MemberCreationDialogData
} from '../../../shared/dialog/member-creation-dialog/member-creation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MemberDialogService {

    constructor(
        private dialog: MatDialog,
    ) {
    }

    openMemberDialog(member: MemberModel) {
        this.dialog.open(MemberDialogComponent, {
            width: '95%',
            maxWidth: '950px',
            data: {member: member} as MemberDialogData,
        });
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

    openMemberCreationDialog(formId: string, eventSubject?: Subject<MemberEvent>) {
        const dialogRef = this.dialog.open(MemberCreationDialogComponent, {
            width: '95%',
            maxWidth: '950px',
            data: {
                formId: formId
            } as MemberCreationDialogData,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            eventSubject?.next(result);
        });
    }

    openSearchDialog() {
        this.dialog.open(SearchDialogComponent, {
            width: '95%',
            maxWidth: '950px',
        });
    }
}
