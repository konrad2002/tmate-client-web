import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseSelectionComponent} from './course-selection.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('CourseSelectionComponent', () => {
    let component: CourseSelectionComponent;
    let fixture: ComponentFixture<CourseSelectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseSelectionComponent],
            providers: [

                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
