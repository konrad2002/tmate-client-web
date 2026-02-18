import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CourseListDialogComponent} from '../../../shared/dialog/course/course-list-dialog/course-list-dialog.component';
import {CourseDialogComponent} from '../../../shared/dialog/course/course-dialog/course-dialog.component';

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

    openCourseDialog() {
        this.dialog.open(CourseDialogComponent, {
            width: '50%',
            maxWidth: '500px'
        });
    }
}
