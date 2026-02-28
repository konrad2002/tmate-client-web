import {Component, forwardRef, inject, OnInit} from '@angular/core';
import {CourseService} from '../../../core/service/api/course.service';
import {CourseModel} from '../../../core/model/course.model';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from '@angular/material/autocomplete';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../../../shared/elements/spinner/spinner.component';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

/**
 * Course selection component that works with Angular Forms.
 *
 * Usage examples:
 *
 * 1. With [(ngModel)] for two-way binding:
 *    <app-course-selection [(ngModel)]="selectedCourse"></app-course-selection>
 *
 * 2. With [ngModel] and (ngModelChange) for one-way binding:
 *    <app-course-selection [ngModel]="selectedCourse" (ngModelChange)="onCourseChange($event)"></app-course-selection>
 *
 * 3. With reactive forms:
 *    <app-course-selection [formControl]="courseControl"></app-course-selection>
 *
 * The component accepts and emits CourseModel objects.
 */
@Component({
  selector: 'app-course-selection',
    imports: [
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        ReactiveFormsModule,
        SpinnerComponent,
        MatIconButton,
        MatIcon,
        FormsModule,
        MatSuffix
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CourseSelectionComponent),
            multi: true
        }
    ],
  templateUrl: './course-selection.component.html',
  styleUrl: './course-selection.component.scss'
})
export class CourseSelectionComponent implements OnInit, ControlValueAccessor {
    private courseService: CourseService = inject(CourseService);

    courseSearchText = "";

    fetching = false;
    courses: CourseModel[] = [];

    filteredCourses = () => {
        console.log("this.memberSearchText.toLowerCase()")
        console.log(this.courseSearchText)
        console.log(this.courseSearchText.toLowerCase())
        return this.courses.filter(course => {
            return course.name.toLowerCase().includes(this.courseSearchText.toLowerCase())
        })
    };

    selectedCourse?: CourseModel;

    // ControlValueAccessor implementation
    private onChange: (value: CourseModel | undefined) => void = () => {
        //
    };
    private onTouched: () => void = () => {
        //
    };
    disabled = false;

    writeValue(value: CourseModel | undefined): void {
        this.selectedCourse = value;
        this.courseSearchText = value?.name || "";
    }

    registerOnChange(fn: (value: CourseModel | undefined) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnInit() {
        this.fetchCourses();
    }

    fetchCourses() {
        this.fetching = true;
        this.courseService.getCourses().subscribe({
            next: data => {
                this.courses = data.map(CourseModel.fromDto);
                this.fetching = false;
            }, error: err => {
                console.log(err);
                this.fetching = false;
            }
        })
    }

    unselect() {
        this.selectedCourse = undefined;
        this.courseSearchText = "";
        this.onChange(undefined);
        this.onTouched();
    }

    selectCourse($event: MatAutocompleteSelectedEvent) {
        this.selectedCourse = $event.option.value;
        this.courseSearchText = this.selectedCourse!.name;
        this.onChange(this.selectedCourse);
        this.onTouched();
    }
}
