import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseDialogComponent} from './course-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('CourseDialogComponent', () => {
    let component: CourseDialogComponent;
    let fixture: ComponentFixture<CourseDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
