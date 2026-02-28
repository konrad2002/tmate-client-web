import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseListExportDialogComponent} from './course-list-export-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('CourseListExportDialogComponent', () => {
    let component: CourseListExportDialogComponent;
    let fixture: ComponentFixture<CourseListExportDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseListExportDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseListExportDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
