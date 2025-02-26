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
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-main-table',
    imports: [
        MatProgressBar,
        MatIcon,
        NgIf,
        NgForOf,
        DatePipe
    ],
    templateUrl: './main-table.component.html',
    styleUrl: './main-table.component.scss',
    standalone: true
})
export class MainTableComponent implements OnDestroy {
    fields: FieldModel[] = [];
    members: MemberModel[] = [];
    query: QueryModel = {} as QueryModel;

    fieldSubscription: Subscription;
    memberSubscription: Subscription;
    querySubscription: Subscription;
    fetchingSubscription: Subscription;

    fetching = 0;
    fetchingQuery = false;

    families?: Families;

    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    constructor(
        private fieldService: FieldService,
        private memberService: MemberService,
        private tableService: TableService,
        private configService: ConfigService
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
                this.special_fields = config;
                this.fetching--;
            }, error: _ => {
                this.fetching--;
            }
        })
    }

    ngOnDestroy() {
        this.memberSubscription.unsubscribe();
        this.fieldSubscription.unsubscribe();
    }

    getValuesAsList(field: FieldModel, member: MemberModel): string {
        if (!member.data[field.name]) return "";

        const entries: string[] = []
        for (const value of member.data[field.name]) {
            entries.push(field.data.options[value]);
        }
        return entries.join(", ");
    }

    selectMember(member: MemberModel) {
        this.tableService.setSelectedMember(member);
    }

    getFamilyMemberString(family: FamilyModel): string {
        const memberNames: string[] = []
        for (const member of family.members) {
            memberNames.push(member.data[this.special_fields.first_name] + " " + member.data[this.special_fields.last_name])
        }
        return memberNames.join(", ")
    }

    protected readonly FieldType = FieldType;

    sortByField(field: FieldModel, direction = 1) {
        this.tableService.runQuery(this.query, {field: field, direction: direction} as QuerySortingModel)
    }
}
