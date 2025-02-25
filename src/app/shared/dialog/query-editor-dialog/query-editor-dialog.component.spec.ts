import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QueryEditorDialogComponent} from './query-editor-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('QueryEditorDialogComponent', () => {
    let component: QueryEditorDialogComponent;
    let fixture: ComponentFixture<QueryEditorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QueryEditorDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(QueryEditorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
