import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../core/service/toolbar.service';
import {TableService} from '../../../core/service/table.service';
import {MemberModel} from '../../../core/model/member.model';
import {Subscription} from 'rxjs';
import {QueryModel} from '../../../core/model/query.model';
import {QueryService} from '../../../core/service/api/query.service';

enum TabName {
    START,
    MEMBERS,
    QUERIES,
    EXPORT
}

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    standalone: false
})
export class ToolbarComponent implements OnInit, OnDestroy {
    currentTab: TabName = TabName.START;

    selectedMember?: MemberModel;
    selectedMemberSubscription: Subscription;

    queries: QueryModel[] = [];


    protected readonly TabName = TabName;

    constructor(
        private toolbarService: ToolbarService,
        private tableService: TableService,
        private queryService: QueryService
    ) {
        this.selectedMemberSubscription = this.tableService.selectedMember.subscribe(member => {
            this.selectedMember = member;
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
    }

    switchTab(tab: TabName) {
        this.currentTab = tab;
    }

    onMemberAddClick() {
        this.toolbarService.openMemberAddDialog();
    }

    onMemberViewClick() {
        this.toolbarService.openMemberAddDialog();
    }

    onMemberEditClick() {
        if (this.selectedMember) {
            this.toolbarService.openMemberEditDialog(this.selectedMember);
        }
    }

    onStartExample() {
        this.tableService.runQuery(new class implements QueryModel {
            id = "67ba5eda614dc8fe05444d4b";
            name = "Example";
            owner_user_id = "";
            public = true;
            query: any;
        })
    }
}
