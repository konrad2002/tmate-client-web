import {Component, Inject, inject, OnInit} from '@angular/core';
import {SpecialFieldsConfig} from '../../../../core/model/config.model';
import {FieldService} from '../../../../core/service/api/field.service';
import {MemberService} from '../../../../core/service/api/member.service';
import {ConfigService} from '../../../../core/service/api/config.service';
import {FieldModel} from '../../../../core/model/field.model';
import {CourseModel, CourseRegistrationModelDto} from '../../../../core/model/course.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MemberModel} from '../../../../core/model/member.model';
import {MatButton, MatIconButton} from '@angular/material/button';
import {SpinnerComponent} from '../../../elements/spinner/spinner.component';
import {MatIcon} from '@angular/material/icon';
import {MemberDialogService} from '../../../../core/service/dialog/member-dialog.service';
import {FormService} from '../../../../core/service/api/form.service';
import {FormModel} from '../../../../core/model/form.model';
import {CourseDialogService} from '../../../../core/service/dialog/course-dialog.service';

export interface CourseParticipantsDialogData {
    course: CourseModel;
}

@Component({
  selector: 'app-course-participant-list-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        SpinnerComponent,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './course-participant-list-dialog.component.html',
  styleUrl: './course-participant-list-dialog.component.scss'
})
export class CourseParticipantListDialogComponent implements OnInit {
    private fieldService: FieldService = inject(FieldService);
    private memberService: MemberService = inject(MemberService);
    private configService: ConfigService = inject(ConfigService);
    private formService: FormService = inject(FormService);
    private memberDialogService: MemberDialogService = inject(MemberDialogService);
    private courseDialogService: CourseDialogService = inject(CourseDialogService);

    fetching = 0;

    fields: FieldModel[] = [];
    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    members: MemberModel[] = [];

    courseForm?: FormModel;

    constructor(
        public dialogRef: MatDialogRef<CourseParticipantListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CourseParticipantsDialogData,
    ) {
        this.courseForm = this.formService.getCourseForm();
    }

    ngOnInit() {
        this.fetching++;
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        this.fetching++;
        this.configService.getSpecialFields().subscribe({
            next: config => {
                this.special_fields = config;
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        this.fetchMembers();
    }

    fetchMembers() {
        this.fetching++;
        if (!(this.data && this.data.course && this.data.course.id)) return;
        this.memberService.getMembersByCourse(this.data.course.id).subscribe({
            next: members => {
                this.members = members;
                this.fetching--;
            },
            error: _ => { this.fetching--; }
        })
    }

    addParticipant() {
        this.courseDialogService.openCourseParticipationAddDialog(this.data.course);
    }

    getCourseRegistrationDate(member: MemberModel): string {
        const courses: CourseRegistrationModelDto[] = member.data[this.special_fields.courses] as CourseRegistrationModelDto[];
        const course = courses.filter(c => {
            return c.course_id == this.data.course!.id;
        });

        if (course.length > 0) {
            return course[0].registered_at
        } else {
            return "-"
        }
    }

    openMemberDetailsDialog(member: MemberModel) {
        this.memberDialogService.openMemberDialog(member);
    }

    openMemberEditDialog(member: MemberModel) {
        this.memberDialogService.openMemberDetailDialog(true, member);
    }

    removeFromCourse(member: MemberModel) {
        // TODO
    }

    refreshList() {
        this.fetchMembers();
    }
}
