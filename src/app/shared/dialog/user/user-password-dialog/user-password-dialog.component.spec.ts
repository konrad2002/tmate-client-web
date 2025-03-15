import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPasswordDialogComponent} from './user-password-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('UserPasswordDialogComponent', () => {
    let component: UserPasswordDialogComponent;
    let fixture: ComponentFixture<UserPasswordDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserPasswordDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserPasswordDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
