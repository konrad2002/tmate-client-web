import {Component, OnInit} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MemberModel} from '../../../core/model/member.model';
import {MemberService} from '../../../core/service/api/member.service';
import {SpecialFieldsConfig} from '../../../core/model/config.model';
import {ConfigService} from '../../../core/service/api/config.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MemberDialogService} from '../../../core/service/member-dialog.service';

@Component({
    selector: 'app-search-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatFormField,
        MatInput,
        FormsModule,
        MatLabel,
        MatIcon,
        MatIconButton
    ],
    templateUrl: './search-dialog.component.html',
    styleUrl: './search-dialog.component.scss',
    standalone: true
})
export class SearchDialogComponent implements OnInit {
    searchString = "";

    members: MemberModel[] = [];
    membersFiltered: MemberModel[] = [];

    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    constructor(
        public dialogRef: MatDialogRef<SearchDialogComponent>,
        private memberService: MemberService,
        private configService: ConfigService,
        private dialogService: MemberDialogService
    ) {
    }

    ngOnInit() {
        this.configService.getSpecialFields().subscribe(config => {
            this.special_fields = config;
        })

        this.memberService.getMembers().subscribe(members => {
            this.members = members;
            this.membersFiltered = members;
        })
    }

    runSearch() {
        if (this.searchString.length < 2) {
            this.membersFiltered = this.members;
        }
        this.membersFiltered = this.members.filter( (member) => {
            const firstName: string = member.data[this.special_fields.first_name];
            const lastName: string = member.data[this.special_fields.last_name];
            return (firstName.toLowerCase().includes(this.searchString.toLowerCase())) || (lastName.toLowerCase().includes(this.searchString.toLowerCase()));
        });
    }

    showMember(member: MemberModel) {
        this.dialogRef.close();
        this.dialogService.openMemberDialog(member);
    }
}
