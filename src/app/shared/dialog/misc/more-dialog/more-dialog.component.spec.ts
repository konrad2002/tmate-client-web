import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoreDialogComponent} from './more-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('MoreDialogComponent', () => {
    let component: MoreDialogComponent;
    let fixture: ComponentFixture<MoreDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MoreDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MoreDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
