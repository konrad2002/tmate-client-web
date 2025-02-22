import { Injectable } from '@angular/core';
import {MemberDialogService} from './member-dialog.service';
import {MemberModel} from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(
      private memberDialogService: MemberDialogService
  ) { }

    openMemberAddDialog() {
      this.memberDialogService.openMemberDetailDialog(false);
    }

    openMemberEditDialog(member: MemberModel) {
      this.memberDialogService.openMemberDetailDialog(true, member);
    }
}
