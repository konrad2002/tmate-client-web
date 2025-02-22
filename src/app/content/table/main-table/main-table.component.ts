import {Component, OnInit} from '@angular/core';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {FieldService} from '../../../core/service/api/field.service';
import {MemberModel} from '../../../core/model/member.model';
import {MemberService} from '../../../core/service/api/member.service';
import {TableService} from '../../../core/service/table.service';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss',
  standalone: false
})
export class MainTableComponent implements OnInit {
    fields: FieldModel[] = [];
    members: MemberModel[] = [];

    constructor(
        private fieldService: FieldService,
        private memberService: MemberService,
        private tableService: TableService
    ) {
    }

    ngOnInit() {
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
            }
        })

        this.memberService.getMembers().subscribe({
            next: members => {
                this.members = members;
            }
        })
    }

    getValuesAsList(field: FieldModel, member: MemberModel): string {
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
