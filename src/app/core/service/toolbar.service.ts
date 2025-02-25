import { Injectable } from '@angular/core';
import {MemberDialogService} from './member-dialog.service';
import {MemberModel} from '../model/member.model';
import {TableService} from './table.service';
import {QueryDialogService} from './query-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(
      private memberDialogService: MemberDialogService,
      private queryDialogService: QueryDialogService,
      private tableService: TableService
  ) { }

    openMemberAddDialog() {
      this.memberDialogService.openMemberDetailDialog(false);
    }

    openMemberEditDialog(member: MemberModel) {
      this.memberDialogService.openMemberDetailDialog(true, member);
    }

    openMemberDialog(member: MemberModel) {
      this.memberDialogService.openMemberDialog(member);
    }

    openSearchDialog() {
        this.memberDialogService.openSearchDialog();
    }

    refreshQuery() {
        this.tableService.runQuery();
    }

    openQueryAddDialog() {
        this.queryDialogService.openQueryEditDialog(false);
    }
}
