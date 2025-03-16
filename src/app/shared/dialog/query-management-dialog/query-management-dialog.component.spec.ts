import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QueryManagementDialogComponent} from './query-management-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('QueryManagementDialogComponent', () => {
    let component: QueryManagementDialogComponent;
    let fixture: ComponentFixture<QueryManagementDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QueryManagementDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(QueryManagementDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
