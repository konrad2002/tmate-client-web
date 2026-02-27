import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseParticipantAddDialogComponent} from './course-participant-add-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('CourseParticipantAddDialogComponent', () => {
    let component: CourseParticipantAddDialogComponent;
    let fixture: ComponentFixture<CourseParticipantAddDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseParticipantAddDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseParticipantAddDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
