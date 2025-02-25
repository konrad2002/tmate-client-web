import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamilyMemberFindDialogComponent} from './family-member-find-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('FamilyMemberFindDialogComponent', () => {
    let component: FamilyMemberFindDialogComponent;
    let fixture: ComponentFixture<FamilyMemberFindDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FamilyMemberFindDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FamilyMemberFindDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
