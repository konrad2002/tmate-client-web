import {Component, OnInit} from '@angular/core';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {FieldService} from '../../../core/service/api/field.service';
import {MemberModel} from '../../../core/model/member.model';
import {MemberService} from '../../../core/service/api/member.service';

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
        private memberService: MemberService
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

    protected readonly FieldType = FieldType;
}
