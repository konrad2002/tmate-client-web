import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../core/service/toolbar.service';
import {TableService} from '../../../core/service/table.service';
import {MemberModel} from '../../../core/model/member.model';
import {Subscription} from 'rxjs';
import {QueryModel} from '../../../core/model/query.model';
import {QueryService} from '../../../core/service/api/query.service';
import {ToolbarButtonComponent} from './toolbar-button/toolbar-button.component';
import {MatIcon} from '@angular/material/icon';
import {HelpDialogService} from '../../../core/service/help-dialog.service';

export enum TabName {
    START,
    EDIT,
    MEMBERS,
    QUERIES,
    EXPORT
}

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    imports: [
        ToolbarButtonComponent,
        MatIcon,
    ],
    standalone: true
})
export class ToolbarComponent implements OnInit, OnDestroy {
    currentTab: TabName = TabName.START;
    tabSubscription: Subscription;

    dirty = false;
    dirtySubscription: Subscription;

    selectedMember?: MemberModel;
    selectedMemberSubscription: Subscription;


    queries: QueryModel[] = [];


    protected readonly TabName = TabName;

    constructor(
        private toolbarService: ToolbarService,
        private tableService: TableService,
        private queryService: QueryService,
        private helpDialogService: HelpDialogService
    ) {
        this.selectedMemberSubscription = this.tableService.selectedMember.subscribe(member => {
            this.selectedMember = member;
        })
        this.tabSubscription = this.toolbarService.tab.subscribe(tab => {
            this.currentTab = tab;
        })
        this.dirtySubscription = this.tableService.dirty.subscribe(dirty => {
            this.dirty = dirty;
        })
    }

    ngOnInit() {
        this.fetchQueries();
    }

    fetchQueries() {
        this.queryService.getQueries().subscribe(queries => {
            this.queries = queries;
            console.log(queries);
        })
    }

    ngOnDestroy() {
        this.selectedMemberSubscription.unsubscribe();
        this.tabSubscription.unsubscribe();
    }

    switchTab(tab: TabName) {
        this.toolbarService.setTab(tab);
    }

    onMemberAddClick() {
        this.toolbarService.openMemberAddDialog();
    }

    onMemberViewClick() {
        if (this.selectedMember) {
            this.toolbarService.openMemberDialog(this.selectedMember);
        }
    }

    onMemberEditClick() {
        if (this.selectedMember) {
            this.toolbarService.openMemberEditDialog(this.selectedMember);
        }
    }

    onStartQuery(query: QueryModel) {
        this.tableService.runQuery(query);
    }

    onStartSearch() {
        this.toolbarService.openSearchDialog();
    }

    onStartRefresh() {
        this.toolbarService.refreshQuery();
    }

    onQueryAddClick() {
        this.toolbarService.openQueryAddDialog();
    }

    onQueryEditClick(query: QueryModel) {
        this.toolbarService.openQueryEditDialog(query);
    }

    onEditSave() {
        this.tableService.saveTableEvent.next(true);
    }

    onEditReset() {
        this.tableService.runQuery();
    }

    onEditEdit() {
        this.helpDialogService.openHelp(5);
    }

    onExportCurrentExcel() {
        this.toolbarService.onExportExcel();
    }
}
