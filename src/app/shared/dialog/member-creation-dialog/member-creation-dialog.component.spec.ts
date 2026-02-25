import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberCreationDialogComponent} from './member-creation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('MemberCreationDialogComponent', () => {
    let component: MemberCreationDialogComponent;
    let fixture: ComponentFixture<MemberCreationDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MemberCreationDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MemberCreationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
