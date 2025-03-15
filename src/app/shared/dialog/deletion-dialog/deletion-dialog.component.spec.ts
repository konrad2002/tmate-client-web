import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeletionDialogComponent} from './deletion-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('DeletionDialogComponent', () => {
    let component: DeletionDialogComponent;
    let fixture: ComponentFixture<DeletionDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeletionDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DeletionDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
