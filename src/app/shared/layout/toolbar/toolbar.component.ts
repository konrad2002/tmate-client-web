import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../core/service/toolbar.service';
import {TableService} from '../../../core/service/table.service';
import {MemberModel} from '../../../core/model/member.model';
import {Subscription} from 'rxjs';
import {QueryModel} from '../../../core/model/query.model';
import {QueryService} from '../../../core/service/api/query.service';
import {ToolbarButtonComponent} from './toolbar-button/toolbar-button.component';
import {MatIcon} from '@angular/material/icon';
import {HelpDialogService} from '../../../core/service/dialog/help-dialog.service';
import {UserModel} from '../../../core/model/user.model';
import {AuthService} from '../../../core/service/auth.service';
import {NgIf} from '@angular/common';

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
        NgIf,
    ],
    standalone: true
})
export class ToolbarComponent implements OnInit, OnDestroy {
    currentTab: TabName = TabName.START;
    tabSubscription: Subscription;

    dirty = false;
    dirtySubscription: Subscription;

    selectedMembers?: MemberModel[];
    selectedMemberSubscription: Subscription;

    currentUserSubscription: Subscription;
    currentUser?: UserModel;


    queries: QueryModel[] = [];


    protected readonly TabName = TabName;

    constructor(
        private toolbarService: ToolbarService,
        private tableService: TableService,
        private queryService: QueryService,
        private helpDialogService: HelpDialogService,
        private authService: AuthService
    ) {
        this.selectedMemberSubscription = this.tableService.selectedMember.subscribe(members => {
            this.selectedMembers = members;
        })
        this.tabSubscription = this.toolbarService.tab.subscribe(tab => {
            this.currentTab = tab;
        })
        this.dirtySubscription = this.tableService.dirty.subscribe(dirty => {
            this.dirty = dirty;
        })
        this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
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
        this.dirtySubscription.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }

    switchTab(tab: TabName) {
        this.toolbarService.setTab(tab);
    }

    onMemberAddClick() {
        this.toolbarService.openMemberAddDialog();
    }

    onMemberViewClick() {
        if (this.selectedMembers?.length === 1) {
            this.toolbarService.openMemberDialog(this.selectedMembers[0]);
        }
    }

    onMemberEditClick() {
        if (this.selectedMembers?.length === 1) {
            this.toolbarService.openMemberEditDialog(this.selectedMembers[0]);
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

    onExportSerialMailClick() {
        this.toolbarService.onOpenEmailEditorDialog();
    }
}
