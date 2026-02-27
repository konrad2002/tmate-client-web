import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseParticipantListDialogComponent} from './course-participant-list-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('CourseParticipantListDialogComponent', () => {
    let component: CourseParticipantListDialogComponent;
    let fixture: ComponentFixture<CourseParticipantListDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CourseParticipantListDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseParticipantListDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
