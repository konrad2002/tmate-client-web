import {Component, inject, Inject, OnInit} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
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
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

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
        MatIcon,
        MatLabel,
        MatOption,
        ReactiveFormsModule,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatFormFieldModule,
        MatIconModule,
        MatAutocompleteModule,
        FormsModule,
        MatInput,
    ],
  templateUrl: './course-participant-add-dialog.component.html',
  styleUrl: './course-participant-add-dialog.component.scss'
})
export class CourseParticipantAddDialogComponent implements OnInit {
    private memberDialogService: MemberDialogService = inject(MemberDialogService);
    private courseService: CourseService = inject(CourseService);

    courses: CourseModel[] = [];

    constructor(
        public dialogRef: MatDialogRef<CourseParticipantAddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CourseParticipantAddDialogData,
    ) {
    }

    ngOnInit() {
        this.courseService.getCourses().subscribe({
            next: courses => {
                this.courses = courses.map(CourseModel.fromDto);
            }
        })
    }

    onExistingMemberClick() {
        this.memberDialogService.openSearchDialog();
    }

    onCreateMemberClick() {
        this.memberDialogService.openCourseMemberFormDialog();
    }
}
