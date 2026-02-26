import {Component, inject, Inject, OnInit} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CourseModel} from '../../../../core/model/course.model';
import {MemberDialogService} from '../../../../core/service/dialog/member-dialog.service';
import {CourseService} from '../../../../core/service/api/course.service';
import {
    MatAutocomplete,
    MatAutocompleteModule,
    MatAutocompleteTrigger,
    MatOption
} from '@angular/material/autocomplete';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MemberModel} from '../../../../core/model/member.model';
import {SpecialFieldsConfig} from '../../../../core/model/config.model';
import {ConfigService} from '../../../../core/service/api/config.service';
import {MemberService} from '../../../../core/service/api/member.service';
import {DatePipe} from '@angular/common';
import {last, ReplaySubject, Subject} from 'rxjs';
import {MemberEvent} from '../../../../core/model/event/member-event.model';

export interface CourseParticipantAddDialogData {
    course?: CourseModel
}

@Component({
  selector: 'app-course-participant-add-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatAutocompleteTrigger,
        MatFormField,
        MatLabel,
        MatOption,
        ReactiveFormsModule,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatFormFieldModule,
        MatAutocompleteModule,
        FormsModule,
        MatInput,
        MatIcon,
        MatIconButton,
        DatePipe,
    ],
  templateUrl: './course-participant-add-dialog.component.html',
  styleUrl: './course-participant-add-dialog.component.scss'
})
export class CourseParticipantAddDialogComponent implements OnInit {
    private memberDialogService: MemberDialogService = inject(MemberDialogService);
    private courseService: CourseService = inject(CourseService);
    private configService: ConfigService = inject(ConfigService);
    private memberService: MemberService = inject(MemberService);

    courses: CourseModel[] = [];

    selectedCourseName = "";


    firstName = "";
    lastName = "";

    members: MemberModel[] = [];
    membersFiltered: MemberModel[] = [];

    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    selectedCourse?: CourseModel;
    selectedMember?: MemberModel;

    constructor(
        public dialogRef: MatDialogRef<CourseParticipantAddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CourseParticipantAddDialogData,
    ) {
        if (this.data.course) {
            this.selectedCourseName = this.data.course.name;
            this.selectedCourse = this.data.course;
        }
    }

    ngOnInit() {
        this.courseService.getCourses().subscribe({
            next: courses => {
                this.courses = courses.map(CourseModel.fromDto);
            }
        })

        this.configService.getSpecialFields().subscribe(config => {
            this.special_fields = config;
        })

        this.fetchMembers();
    }

    fetchMembers() {
        this.memberService.getMembers().subscribe(members => {
            this.members = members;
            this.membersFiltered = members;
        })
    }

    runSearch() {
        if (this.firstName.length < 2 && this.lastName.length < 2) {
            this.membersFiltered = this.members;
        }

        this.membersFiltered = this.members.filter( (member) => {
            const firstName: string = member.data[this.special_fields.first_name];
            const lastName: string = member.data[this.special_fields.last_name];
            return (firstName.toLowerCase().includes(this.firstName.toLowerCase())) && (lastName.toLowerCase().includes(this.lastName.toLowerCase()));
        });
    }

    onCreateMemberClick() {
        const member = {
            data: {} as Record<string, any>,
        } as MemberModel;

        member.data[this.special_fields.first_name] = this.firstName;
        member.data[this.special_fields.last_name] = this.lastName;

        const eventSubject = new Subject<MemberEvent>();
        eventSubject.subscribe(event => {
            this.selectedMember = event.member;
            this.fetchMembers();
            this.runSearch();
        })
        this.memberDialogService.openCourseMemberFormDialog(member, eventSubject);
    }

    selectMember(member: MemberModel) {
        this.selectedMember = member;
    }

    selectCourse() {
        this.selectedCourse = this.courses.find(c => c.name === this.selectedCourseName);
    }

    addMemberToCourse() {
        // TODO
    }

    protected readonly last = last;
}
