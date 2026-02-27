import {Component, inject, Inject, OnInit} from '@angular/core';
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
import {DatePipe, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {SpinnerComponent} from '../../elements/spinner/spinner.component';
import {Families} from '../../../core/model/family.model';
import {SpecialFieldsConfig} from '../../../core/model/config.model';
import {ConfigService} from '../../../core/service/api/config.service';
import {MemberDialogService} from '../../../core/service/dialog/member-dialog.service';
import {CourseModel} from '../../../core/model/course.model';
import {CourseService} from '../../../core/service/api/course.service';

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
        SpinnerComponent,
        NgIf
    ],
    templateUrl: './member-dialog.component.html',
    styleUrl: './member-dialog.component.scss',
    standalone: true
})
export class MemberDialogComponent implements OnInit{
    private fieldService: FieldService = inject(FieldService);
    private memberService: MemberService = inject(MemberService);
    private configService: ConfigService = inject(ConfigService);
    private dialogService: MemberDialogService = inject(MemberDialogService);
    private courseService: CourseService = inject(CourseService);

    protected readonly FieldType = FieldType;

    fields: FieldModel[] = [];
    courses: CourseModel[] = [];
    member?: MemberModel

    fetching = 0;

    families?: Families;

    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    constructor(
        public dialogRef: MatDialogRef<MemberDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MemberDialogData,
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
        this.memberService.getFamilies().subscribe({
            next: families => {
                this.families = families;
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

        this.fetching++;
        this.courseService.getCourses().subscribe({
            next: courses => {
                this.courses = courses.map(CourseModel.fromDto);
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        if (this.data.member) {
            this.fetching++;
            this.memberService.getMemberById(this.data.member.id).subscribe({
                next: member => {
                    this.member = member;
                    console.log("using:", this.member)
                    this.fetching--;
                }, error: _ => { this.fetching--; }
            })
        }
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

    getCourseById(id: string): CourseModel {
        return this.courses.find(c => c.id == id) as CourseModel;
    }
}
