import {AfterViewInit, Component, Inject, inject, ViewChild} from '@angular/core';
import {CourseModel} from '../../../../core/model/course.model';
import {MemberService} from '../../../../core/service/api/member.service';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatOption} from '@angular/material/autocomplete';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../../../elements/spinner/spinner.component';
import {MatSelect} from '@angular/material/select';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {FieldService} from '../../../../core/service/api/field.service';
import {MemberModel} from '../../../../core/model/member.model';
import {FieldModel} from '../../../../core/model/field.model';
import {CourseSelectionComponent} from '../../../../content/course/course-selection/course-selection.component';

export interface CourseListExportDialogData {
    course?: CourseModel
}

export interface CourseListExportTypeData {
    type: CourseListExportType;
    displayName: string;
    columns: string[];
}

export enum CourseListExportType {
    PARTICIPANTS = "PARTICIPANTS",
    ATTENDANCE = "ATTENDANCE"
}

export interface CourseAttendanceListExportConfig {
    units: number,
    extraColumns: number;
}

@Component({
    selector: 'app-course-list-export-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        ReactiveFormsModule,
        MatDialogClose,
        FormsModule,
        MatSelect,
        MatStepper,
        MatStep,
        MatStepperNext,
        SpinnerComponent,
        MatStepperPrevious,
        CourseSelectionComponent
    ],
    templateUrl: './course-list-export-dialog.component.html',
    styleUrl: './course-list-export-dialog.component.scss'
})
export class CourseListExportDialogComponent implements AfterViewInit {
    private memberService: MemberService = inject(MemberService);
    private fieldService: FieldService = inject(FieldService);

    generatingList = 0;

    selectedCourse?: CourseModel;

    selectedListType: CourseListExportTypeData;

    listTypes: CourseListExportTypeData[] = [
        {
            type: CourseListExportType.PARTICIPANTS,
            displayName: "Teilnehmerliste",
            columns: ["vorname", "nachname", "email"]
        },
        {
            type: CourseListExportType.ATTENDANCE,
            displayName: "Anwesenheitsliste",
            columns: ["vorname", "nachname"]
        }
    ];

    attendanceListExportConfig: CourseAttendanceListExportConfig = {
        units: 8,
        extraColumns: 4,
    }

    @ViewChild('stepper') stepper!: MatStepper;

    members: MemberModel[] = [];
    fields: Map<string, FieldModel> = new Map<string, FieldModel>();

    constructor(
        public dialogRef: MatDialogRef<CourseListExportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CourseListExportDialogData,
    ) {
        if (this.data.course) {
            this.selectedCourse = this.data.course;
        }

        this.selectedListType = this.listTypes[0];
    }

    ngAfterViewInit() {
        if (this.data.course) {
            this.stepper.selectedIndex = 1;
        }
    }

    getRangeArray(i: number): number[] {
        return new Array(i).fill(0).map((x, index) => index+1);
    }

    onExportCourseList() {
        if (!this.selectedCourse) return;
        this.exportCourseList();
        this.stepper.next();
    }

    exportCourseList() {
        this.generatingList++;
        setTimeout(() => {
            this.generatingList--;
        }, 2000) // Simulate loading time for better UX

        this.generatingList++;
        this.memberService.getMembersByCourse(this.selectedCourse!.id).subscribe({
            next: members => {
                this.members = members;
                this.generatingList--;
            }, error: error => {
                console.log("Error exporting course list", error);
                this.generatingList--;
            }
        })

        this.generatingList++;
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields.map(f => [f.name, f] as [string, FieldModel]).reduce((map, obj) => map.set(obj[0], obj[1]), new Map<string, FieldModel>());
                this.generatingList--;
            }, error: error => {
                console.log("Error fetching fields for course list export", error);
                this.generatingList--;
            }
        })
    }

    protected readonly CourseListExportType = CourseListExportType;
}
