import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormEditorDialogComponent} from './form-editor-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('FormEditorDialogComponent', () => {
    let component: FormEditorDialogComponent;
    let fixture: ComponentFixture<FormEditorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormEditorDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FormEditorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
