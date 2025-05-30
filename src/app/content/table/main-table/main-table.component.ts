import {Component, OnDestroy} from '@angular/core';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {FieldService} from '../../../core/service/api/field.service';
import {MemberModel} from '../../../core/model/member.model';
import {MemberService} from '../../../core/service/api/member.service';
import {TableService} from '../../../core/service/table.service';
import {Subscription} from 'rxjs';
import {Families, FamilyModel} from '../../../core/model/family.model';
import {SpecialFieldsConfig} from '../../../core/model/config.model';
import {ConfigService} from '../../../core/service/api/config.service';
import {QueryModel, QuerySortingModel} from '../../../core/model/query.model';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToolbarService} from '../../../core/service/toolbar.service';
import {TabName} from '../../../shared/layout/toolbar/toolbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-main-table',
    imports: [
        MatProgressBar,
        MatIcon,
        NgIf,
        NgForOf,
        DatePipe,
        FormsModule,
        KeyValuePipe,
    ],
    templateUrl: './main-table.component.html',
    styleUrl: './main-table.component.scss',
    standalone: true
})
export class MainTableComponent implements OnDestroy {
    fields: FieldModel[] = [];
    members: MemberModel[] = [];
    query: QueryModel = {} as QueryModel;

    dirty = false;

    selectedMembers: MemberModel[] = [];

    fieldSubscription: Subscription;
    memberSubscription: Subscription;
    querySubscription: Subscription;
    fetchingSubscription: Subscription;
    dirtySubscription: Subscription;
    tableSaveEventSubscription: Subscription;
    selectedMemberSubscription: Subscription;

    fetching = 0;
    fetchingQuery = false;

    families?: Families;

    specialFields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    editModeField?: {field: FieldModel, member: MemberModel};
    valueBeforeEdit?: any;

    constructor(
        private fieldService: FieldService,
        private memberService: MemberService,
        private tableService: TableService,
        private configService: ConfigService,
        private toolbarService: ToolbarService,
        private snackBar: MatSnackBar
    ) {

        this.fieldSubscription = this.tableService.fields.subscribe(fields => {
            if (fields)
                this.fields = fields;
        })

        this.memberSubscription = this.tableService.members.subscribe(members => {
            if (members)
                this.members = members;
        })

        this.querySubscription = this.tableService.query.subscribe(query => {
            if (query)
                this.query = query;
        })

        this.fetchingSubscription = this.tableService.fetching.subscribe(fetching => {
            this.fetchingQuery = fetching;
        })

        this.tableSaveEventSubscription = this.dirtySubscription = this.tableService.dirty.subscribe(dirty => {
            this.dirty = dirty;
        })

        this.selectedMemberSubscription = this.tableService.selectedMember.subscribe(members => {
            this.selectedMembers = members;
        })

        this.tableService.saveTableEvent.subscribe(save => {
            if (save) {
                this.saveDirtyMembers();
            }
        })

        this.fetching++;
        this.memberService.getFamilies().subscribe({
            next: families => {
                this.families = families;
                this.fetching--;
            }, error: _ => {
                this.fetching--;
            }
        })

        this.fetching++;
        this.configService.getSpecialFields().subscribe({
            next: config => {
                this.specialFields = config;
                this.fetching--;
            }, error: _ => {
                this.fetching--;
            }
        })
    }

    ngOnDestroy() {
        this.memberSubscription.unsubscribe();
        this.fieldSubscription.unsubscribe();
        this.fetchingSubscription.unsubscribe();
        this.dirtySubscription.unsubscribe();
        this.querySubscription.unsubscribe();
        this.tableSaveEventSubscription.unsubscribe();
    }

    getValuesAsList(field: FieldModel, member: MemberModel): string {
        if (!member.data[field.name]) return "";

        const entries: string[] = []
        for (const value of member.data[field.name]) {
            entries.push(field.data.options[value]);
        }
        return entries.join(", ");
    }

    toggleMemberSelection(member: MemberModel, event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedMembers.push(member);
        } else {
            this.selectedMembers = this.selectedMembers.filter(m => m.id !== member.id);
        }
        this.tableService.setSelectedMembers(this.selectedMembers);
    }

    isSelected(member: MemberModel): boolean {
        return this.selectedMembers.some(m => m.id === member.id);
    }

    getFamilyMemberString(family: FamilyModel): string {
        const memberNames: string[] = []
        for (const member of family.members) {
            memberNames.push(member.data[this.specialFields.first_name] + " " + member.data[this.specialFields.last_name])
        }
        return memberNames.join(", ")
    }

    protected readonly FieldType = FieldType;

    sortByField(field: FieldModel, direction = 1) {
        this.tableService.runQuery(this.query, {field: field, direction: direction} as QuerySortingModel)
    }

    enterFieldEditMode(field: FieldModel, member: MemberModel) {
        this.editModeField = {field: field, member: member};
        this.valueBeforeEdit = member.data[field.name];

        this.toolbarService.setTab(TabName.EDIT);

        // Use setTimeout to wait for DOM update, then focus input
        setTimeout(() => {
            const input = document.querySelector('input');
            input?.focus();
        });
    }

    isEditModeField(field: FieldModel, member: MemberModel) {
        return this.editModeField?.field == field && this.editModeField.member == member;
    }

    leaveFieldEditMode(field: FieldModel, member: MemberModel) {
        if (this.isEditModeField(field, member)) {
            if (this.valueBeforeEdit !== member.data[field.name]) {
                if (!member.dirty) {
                    member.dirty = {};
                }
                member.dirty[field.name] = true;
                this.tableService.setDirty(true);
            }
            this.editModeField = undefined;
        }
    }

    private getMemberName(member: MemberModel): string {
        return member.data[this.specialFields.last_name] + ", " + member.data[this.specialFields.first_name];
    }

    private saveDirtyMembers() {
        let saveCount = 0;
        let savedCount = 0;
        for (const member of this.members) {
            if (member.dirty && Object.values(member.dirty).some(value => value)) {
                saveCount++;
                this.memberService.updateMember(member).subscribe({
                    next: _ => {
                        savedCount++;
                        saveCount--;
                        if (saveCount === 0) {
                            this.snackBar.open("Es wurden " + savedCount + " Mitglieder erfolgreich gespeichert!");
                            this.tableService.runQuery();
                        }
                    },
                    error: err => {
                        console.log(err);
                        saveCount--;
                        this.snackBar.open("Fehler beim Speichern von '" + this.getMemberName(member) + "'!");

                        if (saveCount === 0) {
                            this.tableService.runQuery();
                        }
                    }
                });
            }
        }
    }

    toggleSelectAll() {
        if (this.selectedMembers.length === this.members.length) {
            this.tableService.unselectAllMembers();
        } else {
            this.tableService.setSelectedMembers([...this.members]);
        }
    }

    getAttestDateClass(dateString: string, required: boolean): string {
        const date = new Date(dateString);
        console.log("test date", date, "required", required);
        if (!required) return "attest-not-required";
        if (this.isOlderThanOneYear(date)) return "attest-red";
        if (this.isOlderThan11Months(date)) return "attest-orange";
        return "attest-no-class";
    }

    isOlderThan11Months(date: Date): boolean {
        const now = new Date();
        const elevenMonthsAgo = new Date(now);
        elevenMonthsAgo.setMonth(elevenMonthsAgo.getMonth() - 11);
        console.log("date", date, "evelenMonthsAgo", elevenMonthsAgo);
        return date < elevenMonthsAgo;
    }

    isOlderThanOneYear(date: Date): boolean {
        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return date < oneYearAgo;
    }
}
