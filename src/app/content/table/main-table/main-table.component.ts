import {Component, OnDestroy} from '@angular/core';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {FieldService} from '../../../core/service/api/field.service';
import {MemberModel} from '../../../core/model/member.model';
import {MemberService} from '../../../core/service/api/member.service';
import {TableService} from '../../../core/service/table.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss',
  standalone: false
})
export class MainTableComponent implements OnDestroy {
    fields: FieldModel[] = [];
    members: MemberModel[] = [];

    fieldSubscription: Subscription;
    memberSubscription: Subscription;

    constructor(
        private fieldService: FieldService,
        private memberService: MemberService,
        private tableService: TableService
    ) {
        this.fieldSubscription = this.tableService.fields.subscribe(fields => {
            if (fields)
                this.fields = fields;
        })
        this.memberSubscription = this.tableService.members.subscribe(members => {
            if (members)
                this.members = members;
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

    protected readonly FieldType = FieldType;
}
