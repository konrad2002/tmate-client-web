import {Component, inject, Inject, OnInit} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CourseModel, CourseRegistrationModelDto} from '../../../../core/model/course.model';
import {MemberDialogService} from '../../../../core/service/dialog/member-dialog.service';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MemberModel} from '../../../../core/model/member.model';
import {SpecialFieldsConfig} from '../../../../core/model/config.model';
import {ConfigService} from '../../../../core/service/api/config.service';
import {MemberService} from '../../../../core/service/api/member.service';
import {DatePipe} from '@angular/common';
import {Subject} from 'rxjs';
import {MemberEvent} from '../../../../core/model/event/member-event.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SpinnerComponent} from '../../../elements/spinner/spinner.component';
import {CourseSelectionComponent} from '../../../../content/course/course-selection/course-selection.component';
import {MatTooltip} from '@angular/material/tooltip';

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
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInput,
        MatIcon,
        MatIconButton,
        DatePipe,
        SpinnerComponent,
        CourseSelectionComponent,
        MatTooltip,
    ],
  templateUrl: './course-participant-add-dialog.component.html',
  styleUrl: './course-participant-add-dialog.component.scss'
})
export class CourseParticipantAddDialogComponent implements OnInit {
    private memberDialogService: MemberDialogService = inject(MemberDialogService);
    private configService: ConfigService = inject(ConfigService);
    private memberService: MemberService = inject(MemberService);
    private snackBar: MatSnackBar = inject(MatSnackBar);

    fetchingMembers = false;


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
            this.selectedCourse = this.data.course;
        }
    }

    ngOnInit() {
        this.configService.getSpecialFields().subscribe(config => {
            this.special_fields = config;
        })

        this.fetchMembers();
    }

    fetchMembers() {
        this.fetchingMembers = true;
        this.memberService.getMembers().subscribe(members => {
            this.members = members;
            this.membersFiltered = members;
            this.fetchingMembers = false;
            this.runSearch();
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
        })
        this.memberDialogService.openCourseMemberFormDialog(member, eventSubject);
    }

    selectMember(member: MemberModel) {
        this.selectedMember = member;
    }

    addMemberToCourse(saveAndNext: boolean) {
        let courses = this.selectedMember!.data[this.special_fields.courses] as CourseRegistrationModelDto[];
        if (!courses) {
            courses = [];
        }

        courses.push({
            course_id: this.selectedCourse!.id,
            registered_at: new Date().toISOString(),
        } as CourseRegistrationModelDto);

        this.selectedMember!.data[this.special_fields.courses] = courses;

        this.memberService.updateMember(this.selectedMember!).subscribe({
            next: _ => {
                this.dialogRef.close(saveAndNext ? this.selectedCourse : undefined);
                this.snackBar.open("Teilnehmer hinzugefügt!")
            },
            error: err => {
                this.snackBar.open("Fehler beim Hinzufügen des Teilnehmers!");
                console.log(err)
            }
        })
    }

    isMemberAlreadyInCourse(member: MemberModel): boolean {
        const registrations = member.data[this.special_fields.courses] as CourseRegistrationModelDto[];
        if (!registrations || registrations.length <= 0) return false;
        return registrations.find(c => {
            return c.course_id === this.selectedCourse?.id
        }) !== undefined;
    }
}
