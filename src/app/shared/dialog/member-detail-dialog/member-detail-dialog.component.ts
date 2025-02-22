import {Component, Inject, OnInit} from '@angular/core';
import {MemberModel} from '../../../core/model/member.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FieldService} from '../../../core/service/api/field.service';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {MatOption, MatSelect} from '@angular/material/select';
import {KeyValuePipe} from '@angular/common';

export interface MemberDetailDialogData {
    member: MemberModel;
    edit: boolean;
}

@Component({
    selector: 'app-member-detail-dialog',
    templateUrl: './member-detail-dialog.component.html',
    styleUrl: './member-detail-dialog.component.scss',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        FormsModule,
        MatInput,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatLabel,
        MatSelect,
        MatOption,
        KeyValuePipe,
    ],
    standalone: true
})
export class MemberDetailDialogComponent implements OnInit {
    fields: FieldModel[] = [];

    constructor(
        public dialogRef: MatDialogRef<MemberDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MemberDetailDialogData,
        private fieldService: FieldService
    ) {
        if (!this.data.member) {
            this.data.member = {data: {}} as MemberModel;
        }
    }

    ngOnInit() {
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
            }
        })
    }

    protected readonly FieldType = FieldType;
}
