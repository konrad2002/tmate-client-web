import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {QueryModel} from '../../model/query.model';
import {MemberEvent} from '../../model/event/member-event.model';
import {
    QueryEditorDialogComponent,
    QueryEditorDialogData
} from '../../../shared/dialog/query-editor-dialog/query-editor-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class QueryDialogService {

  constructor(
      private dialog: MatDialog
  ) { }

    openQueryEditDialog(edit: boolean, query?: QueryModel, eventSubject?: Subject<MemberEvent>) {
        const dialogRef = this.dialog.open(QueryEditorDialogComponent, {
            width: '95%',
            maxWidth: '950px',
            data: {
                edit: edit,
                query: query
            } as QueryEditorDialogData,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            eventSubject?.next(result);
        });
    }
}
