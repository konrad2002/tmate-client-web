import {Component, OnDestroy} from '@angular/core';
import {ToolbarService} from '../../../core/service/toolbar.service';
import {TableService} from '../../../core/service/table.service';
import {MemberModel} from '../../../core/model/member.model';
import {Subscription} from 'rxjs';

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
export class ToolbarComponent implements OnDestroy {
    currentTab: TabName = TabName.START;

    selectedMember?: MemberModel;
    selectedMemberSubscription: Subscription;


    protected readonly TabName = TabName;

    constructor(
        private toolbarService: ToolbarService,
        private tableService: TableService
    ) {
        this.selectedMemberSubscription = this.tableService.selectedMember.subscribe(member => {
            this.selectedMember = member;
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
}
