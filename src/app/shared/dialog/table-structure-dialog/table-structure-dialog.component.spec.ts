import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableStructureDialogComponent} from './table-structure-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('TableStructureDialogComponent', () => {
    let component: TableStructureDialogComponent;
    let fixture: ComponentFixture<TableStructureDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableStructureDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TableStructureDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
