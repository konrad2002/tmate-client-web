import {Component, EventEmitter, inject, OnInit} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {CourseService} from '../../../../core/service/api/course.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CourseDialogService} from '../../../../core/service/dialog/course-dialog.service';
import {CourseModel} from '../../../../core/model/course.model';
import {DatePipe, CommonModule} from '@angular/common';
import {MatButtonToggleGroup, MatButtonToggle} from '@angular/material/button-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';

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
        FormsModule,
        MatInput,
        MatSlideToggle,
        MatIconButton,
        MatIcon
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
    searchTerm = '';
    searchAll = false;

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
        const today = new Date();
        const query = this.searchTerm.trim().toLowerCase();

        let filtered = this.allCourses;
        if (!this.searchAll) {
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
        }

        if (query.length > 0) {
            filtered = filtered.filter(course => this.matchesSearch(course, query));
        }

        this.courses = filtered;
    }

    private matchesSearch(course: CourseModel, query: string): boolean {
        const haystack = [
            course.id,
            course.name,
            course.location,
            course.time,
            course.day,
            course.price,
            course.total_spots,
            course.free_spots,
            course.style,
            course.level,
            course.age,
            course.information
        ]
            .map(value => (value ?? '').toString().toLowerCase());

        return haystack.some(value => value.includes(query));
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

    editCourse(course: CourseModel) {
        const callback = new EventEmitter<CourseModel>()
        this.courseDialogService.openCourseDialog(course, callback);

        callback.subscribe({
            next: (updatedCourse: CourseModel) => {
                const index = this.allCourses.findIndex(c => c.id === updatedCourse.id);
                if (index !== -1) {
                    this.allCourses[index] = updatedCourse;
                    this.applyFilters();
                }
            }
        })
    }

    addMembers(course: CourseModel) {
        this.courseDialogService.openCourseParticipationAddDialog(course);
    }

    showMembers(course: CourseModel) {
        this.courseDialogService.openCourseParticipationDialog(course);
    }
}
