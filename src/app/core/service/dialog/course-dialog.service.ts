import {EventEmitter, inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CourseListDialogComponent} from '../../../shared/dialog/course/course-list-dialog/course-list-dialog.component';
import {
    CourseDialogComponent,
    CourseDialogData
} from '../../../shared/dialog/course/course-dialog/course-dialog.component';
import {CourseModel} from '../../model/course.model';
import {
    CourseParticipantListDialogComponent, CourseParticipantsDialogData
} from '../../../shared/dialog/course/course-participant-list-dialog/course-participant-list-dialog.component';
import {
    CourseParticipantAddDialogComponent, CourseParticipantAddDialogData
} from '../../../shared/dialog/course/course-participant-add-dialog/course-participant-add-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class CourseDialogService {
    private dialog: MatDialog = inject(MatDialog);

    openCourseListDialog() {
        this.dialog.open(CourseListDialogComponent, {
            width: '95%',
            maxWidth: '1500px'
        })
    }

    openCourseDialog(course?: CourseModel, callback?: EventEmitter<CourseModel>) {
        this.dialog.open(CourseDialogComponent, {
            width: '50%',
            maxWidth: '500px',
            data: {
                course: course
            } as CourseDialogData
        }).afterClosed().subscribe((result: CourseModel) => {
            callback?.next(result);
        });
    }

    openCourseParticipationDialog(course: CourseModel) {
        this.dialog.open(CourseParticipantListDialogComponent, {
            width: '75%',
            maxWidth: '750px',
            data: {
                course: course
            } as CourseParticipantsDialogData
        })
    }

    openCourseParticipationAddDialog(course: CourseModel) {
        this.dialog.open(CourseParticipantAddDialogComponent, {
            width: '75%',
            maxWidth: '750px',
            data: {
                course: course
            } as CourseParticipantAddDialogData
        })
    }
}
