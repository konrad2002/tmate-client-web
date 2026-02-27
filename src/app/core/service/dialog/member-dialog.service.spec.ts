import {TestBed} from '@angular/core/testing';

import {MemberDialogService} from './member-dialog.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('MemberDialogService', () => {
    let service: MemberDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({

            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(MemberDialogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
