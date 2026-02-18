import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseListDialogComponent} from './course-list-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('CourseListDialogComponent', () => {
    let component: CourseListDialogComponent;
    let fixture: ComponentFixture<CourseListDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseListDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseListDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
