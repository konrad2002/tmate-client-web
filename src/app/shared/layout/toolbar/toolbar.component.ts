import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../core/service/toolbar.service';
import {TableService} from '../../../core/service/table.service';
import {MemberModel} from '../../../core/model/member.model';
import {Subscription} from 'rxjs';
import {QueryModel} from '../../../core/model/query.model';
import {QueryService} from '../../../core/service/api/query.service';
import {ToolbarButtonComponent} from './toolbar-button/toolbar-button.component';
import {HelpDialogService} from '../../../core/service/dialog/help-dialog.service';
import {UserModel} from '../../../core/model/user.model';
import {AuthService} from '../../../core/service/auth.service';
import {NgIf} from '@angular/common';
import {NilObjectId} from "../../../core/misc/object-id.const";
import {HasPermissionDirective} from '../../../core/directive/has-permission.directive';
import {CourseDialogService} from '../../../core/service/dialog/course-dialog.service';
import {FormDialogService} from '../../../core/service/dialog/form-dialog.service';
import {FormModel} from '../../../core/model/form.model';
import {FormService} from '../../../core/service/api/form.service';
import {ToolbarDividerComponent} from './toolbar-divider/toolbar-divider.component';

export enum TabName {
    START,
    EDIT,
    MEMBERS,
    FORMS,
    QUERIES,
    COURSES,
    EXPORT
}

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    imports: [
        ToolbarButtonComponent,
        NgIf,
        HasPermissionDirective,
        ToolbarDividerComponent,
    ],
    standalone: true
})
export class ToolbarComponent implements OnInit, OnDestroy {
    private toolbarService: ToolbarService = inject(ToolbarService);
    private tableService: TableService = inject(TableService);
    private queryService: QueryService = inject(QueryService);
    private formService: FormService = inject(FormService);
    private helpDialogService: HelpDialogService = inject(HelpDialogService);
    private courseDialogService: CourseDialogService = inject(CourseDialogService);
    private formDialogService: FormDialogService = inject(FormDialogService);
    private authService: AuthService = inject(AuthService);

    currentTab: TabName = TabName.START;
    tabSubscription: Subscription;

    dirty = false;
    dirtySubscription: Subscription;

    selectedMembers?: MemberModel[];
    selectedMemberSubscription: Subscription;

    currentUserSubscription: Subscription;
    currentUser?: UserModel;

    queries: QueryModel[] = [];
    queriesSubscription: Subscription;

    forms: FormModel[] = [];
    formsSubscription: Subscription;


    protected readonly TabName = TabName;

    constructor() {
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
        this.queriesSubscription = this.queryService.queries.subscribe(queries => {
            this.queries = queries;
        })
        this.formsSubscription = this.formService.forms.subscribe(forms => {
            this.forms = forms;
        })
    }

    ngOnInit() {
        this.fetchQueries();
        this.fetchForms();
    }

    fetchQueries() {
        this.queryService.fetchQueries();
    }

    fetchForms() {
        this.formService.fetchForms();
    }

    ngOnDestroy() {
        this.selectedMemberSubscription.unsubscribe();
        this.tabSubscription.unsubscribe();
        this.dirtySubscription.unsubscribe();
        this.currentUserSubscription.unsubscribe();
        this.queriesSubscription.unsubscribe();
        this.formsSubscription.unsubscribe();
    }

    switchTab(tab: TabName) {
        this.toolbarService.setTab(tab);
    }

    onMemberAddClick() {
        const defaultForm = this.formService.getDefaultForm();

        if (defaultForm) {
            this.toolbarService.openMemberAddFormDialog(defaultForm);
        } else {
            this.toolbarService.openMemberAddDialog();
        }
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

    protected readonly NilObjectId = NilObjectId;

    onCourseListClick() {
        this.courseDialogService.openCourseListDialog();
    }

    onFormsCreateForm() {
        this.formDialogService.openFormEditDialog(false);
    }

    onFormOpen(form: FormModel) {
        this.toolbarService.openMemberAddFormDialog(form);
    }

    onFormEditClick(form: FormModel) {
        this.formDialogService.openFormEditDialog(true, form);
    }

    onCourseAddClick() {
        this.courseDialogService.openCourseParticipationAddDialog();
    }
}
