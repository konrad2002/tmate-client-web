import {Injectable} from '@angular/core';
import {MemberDialogService} from './member-dialog.service';
import {MemberModel} from '../model/member.model';
import {TableService} from './table.service';
import {QueryDialogService} from './query-dialog.service';
import {QueryModel} from '../model/query.model';
import {BehaviorSubject, distinctUntilChanged} from 'rxjs';
import {TabName} from '../../shared/layout/toolbar/toolbar.component';

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    private tabSubject: BehaviorSubject<TabName> = new BehaviorSubject<TabName>(TabName.START);
    public tab = this.tabSubject.asObservable().pipe(distinctUntilChanged());

    constructor(
        private memberDialogService: MemberDialogService,
        private queryDialogService: QueryDialogService,
        private tableService: TableService
    ) {
    }

    setTab(tab: TabName) {
        this.tabSubject.next(tab);
    }

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

    openQueryEditDialog(query: QueryModel) {
        this.queryDialogService.openQueryEditDialog(true, query);
    }
}
