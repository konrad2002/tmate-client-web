import {Component, inject, OnInit} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {CourseService} from '../../../../core/service/api/course.service';
import {MatButton} from '@angular/material/button';
import {CourseDialogService} from '../../../../core/service/dialog/course-dialog.service';
import {CourseModel} from '../../../../core/model/course.model';
import {DatePipe, CommonModule} from '@angular/common';
import {MatButtonToggleGroup, MatButtonToggle} from '@angular/material/button-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-course-list-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose,
        DatePipe,
        CommonModule,
        MatButtonToggleGroup,
        MatButtonToggle,
        MatSelect,
        MatOption,
        MatFormField,
        MatLabel,
        FormsModule
    ],
  templateUrl: './course-list-dialog.component.html',
  styleUrl: './course-list-dialog.component.scss'
})
export class CourseListDialogComponent implements OnInit {
    private courseService: CourseService = inject(CourseService)
    private courseDialogService: CourseDialogService = inject(CourseDialogService)

    allCourses: CourseModel[] = [];
    courses: CourseModel[] = [];
    filterType: 'upcoming' | 'current' | 'past' = 'upcoming';
    selectedYear: number | null = null;
    availableYears: number[] = [];

    constructor(
        public dialogRef: MatDialogRef<CourseListDialogComponent>,
    ) {
    }

    ngOnInit() {
        this.fetchCourses();
    }

    fetchCourses() {
        this.courseService.getCourses().subscribe(courses => {
            this.allCourses = courses.map(dto => CourseModel.fromDto(dto));
            this.extractAvailableYears();
            this.applyFilters();
        })
    }

    applyFilters() {
        this.courses = [];
        console.log("apply filters", this.filterType, this.selectedYear)
        let filtered = this.allCourses;
        const today = new Date();

        switch (this.filterType) {
            case 'upcoming':
                filtered = this.allCourses.filter(course => course.begin_date.getTime() > today.getTime());
                break;
            case 'current':
                filtered = this.allCourses.filter(course => {
                    return course.begin_date.getTime() <= today.getTime() && today.getTime() <= course.end_date.getTime();
                });
                break;
            case 'past':
                filtered = this.allCourses.filter(course => course.end_date.getTime() < today.getTime());
                if (this.selectedYear) {
                    filtered = filtered.filter(course => course.begin_date.getFullYear() === this.selectedYear);
                }
                break;
        }

        this.courses = filtered;
    }

    extractAvailableYears() {
        const years = new Set<number>();
        this.allCourses.forEach(course => {
            years.add(course.begin_date.getFullYear());
        });
        this.availableYears = Array.from(years).sort((a, b) => b - a);
    }

    onFilterTypeChange() {
        this.selectedYear = null;
        this.applyFilters();
    }

    onYearChange() {
        this.applyFilters();
    }

    createCourse() {
        this.courseDialogService.openCourseDialog();
    }
}
