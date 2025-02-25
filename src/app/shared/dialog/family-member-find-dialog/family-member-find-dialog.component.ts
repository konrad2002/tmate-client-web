import {Component, OnInit} from '@angular/core';
import {MemberModel} from '../../../core/model/member.model';
import {SpecialFieldsConfig} from '../../../core/model/config.model';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MemberService} from '../../../core/service/api/member.service';
import {ConfigService} from '../../../core/service/api/config.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Families} from '../../../core/model/family.model';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-family-member-find-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        FormsModule,
        MatInput,
        MatIcon,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        MatIconButton,
        MatLabel,
        NgIf
    ],
    templateUrl: './family-member-find-dialog.component.html',
    styleUrl: './family-member-find-dialog.component.scss',
    standalone: true,
})
export class FamilyMemberFindDialogComponent implements OnInit {
    searchString = "";

    members: MemberModel[] = [];
    membersFiltered: MemberModel[] = [];

    families?: Families;

    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    constructor(
        public dialogRef: MatDialogRef<FamilyMemberFindDialogComponent>,
        private memberService: MemberService,
        private configService: ConfigService,
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

        this.memberService.getFamilies().subscribe(families => {
            console.log(families);
            console.log(families.families);
            console.log(families.families[15]);
            this.families = families;
        })
    }

    runSearch() {
        if (this.searchString.length < 2) {
            this.membersFiltered = this.members;
        }
        this.membersFiltered = this.members.filter((member) => {
            const firstName: string = member.data[this.special_fields.first_name];
            const lastName: string = member.data[this.special_fields.last_name];
            return (firstName.toLowerCase().includes(this.searchString.toLowerCase())) || (lastName.toLowerCase().includes(this.searchString.toLowerCase()));
        });
    }

    selectMember(member: MemberModel) {
        this.dialogRef.close(member);
    }
}
