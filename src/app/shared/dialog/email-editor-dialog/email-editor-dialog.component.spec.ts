import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmailEditorDialogComponent} from './email-editor-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('EmailEditorDialogComponent', () => {
    let component: EmailEditorDialogComponent;
    let fixture: ComponentFixture<EmailEditorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmailEditorDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EmailEditorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
