import {Component, inject} from '@angular/core';
import {CourseService} from '../../../../core/service/api/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {CourseModel} from '../../../../core/model/course.model';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-course-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        MatDialogClose,
        FormsModule,
        MatDateRangeInput,
        MatDatepickerToggle,
        MatDateRangePicker,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {
    private courseService: CourseService = inject(CourseService)
    private snackBar: MatSnackBar = inject(MatSnackBar);

    course: CourseModel = {} as CourseModel;

    // Keep model dates as Date instances when binding from <input type="date" />.
    parseDateInput(value: string | Date | null | undefined): Date {
        if (value instanceof Date) {
            return value;
        }
        return new Date(`${value}T00:00:00Z`);
    }

    constructor(
        public dialogRef: MatDialogRef<CourseDialogComponent>,
    ) {
    }

    createCourse() {
        this.courseService.addCourse(this.course).subscribe({
            next: (result) => {
                this.snackBar.open("Kurs angelegt!")
                this.dialogRef.close(result)
            }, error: _ => {
                this.snackBar.open("Kurs anlegen fehlgeschlagen!")
            }
        });
    }
}
