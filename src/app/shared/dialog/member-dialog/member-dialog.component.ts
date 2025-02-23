import {Component, Inject, OnInit} from '@angular/core';
import {MemberModel} from '../../../core/model/member.model';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {FieldService} from '../../../core/service/api/field.service';
import {MemberService} from '../../../core/service/api/member.service';
import {MatButton} from '@angular/material/button';
import {MemberDialogService} from '../../../core/service/member-dialog.service';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {SpinnerComponent} from '../../elements/spinner/spinner.component';

export interface MemberDialogData {
    member: MemberModel;
}

@Component({
    selector: 'app-member-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        DatePipe,
        MatIcon,
        SpinnerComponent
    ],
    templateUrl: './member-dialog.component.html',
    styleUrl: './member-dialog.component.scss',
    standalone: true
})
export class MemberDialogComponent implements OnInit{
    protected readonly FieldType = FieldType;

    fields: FieldModel[] = [];
    member?: MemberModel

    fetching = 0;

    constructor(
        public dialogRef: MatDialogRef<MemberDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MemberDialogData,
        private fieldService: FieldService,
        private memberService: MemberService,
        private dialogService: MemberDialogService
    ) {}

    ngOnInit() {
        this.fetching++;
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        this.fetching++;
        this.memberService.getMemberById(this.data.member.id).subscribe({
            next: member => {
                this.member = member;
                console.log("using:", this.member)
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })
    }

    startEditing() {
        this.dialogRef.close();
        this.dialogService.openMemberDetailDialog(true, this.member);
    }

    getValuesAsList(field: FieldModel, member: MemberModel): string {
        if (!member.data[field.name]) return "";

        const entries: string[] = []
        for (const value of member.data[field.name]) {
            entries.push(field.data.options[value]);
        }
        return entries.join(", ");
    }
}
