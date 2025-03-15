import {Injectable} from '@angular/core';
import {MemberModel} from '../model/member.model';
import {TableService} from './table.service';
import {QueryModel} from '../model/query.model';
import {BehaviorSubject, distinctUntilChanged} from 'rxjs';
import {TabName} from '../../shared/layout/toolbar/toolbar.component';
import {ExportService} from './api/export.service';
import {FileService} from './file.service';
import {formatCurrentDate} from '../misc/date';
import {EmailDialogService} from './dialog/email-dialog.service';
import {MemberDialogService} from './dialog/member-dialog.service';
import {QueryDialogService} from './dialog/query-dialog.service';

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    private tabSubject: BehaviorSubject<TabName> = new BehaviorSubject<TabName>(TabName.START);
    public tab = this.tabSubject.asObservable().pipe(distinctUntilChanged());

    constructor(
        private memberDialogService: MemberDialogService,
        private queryDialogService: QueryDialogService,
        private tableService: TableService,
        private exportService: ExportService,
        private fileService: FileService,
        private emailDialogService: EmailDialogService,
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

    onExportExcel() {
        this.tableService.query.subscribe(query => {
            if (query) {
                this.exportService.downloadQueryAsExcel(query).subscribe(data => {
                    const blob = new Blob([data], { type: 'text' });
                    this.fileService.download("Mitglieder_" + formatCurrentDate() + ".xlsx", blob);
                },)
            }
        })
    }

    onOpenEmailEditorDialog() {
        this.tableService.selectedMember.subscribe(members => {
            this.emailDialogService.openEMailEditorDialog(members);
        }).unsubscribe();
    }
}
