import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminDialogComponent} from './admin-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('AdminDialogComponent', () => {
    let component: AdminDialogComponent;
    let fixture: ComponentFixture<AdminDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
