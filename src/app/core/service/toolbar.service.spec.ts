import { TestBed } from '@angular/core/testing';

import { ToolbarService } from './toolbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('ToolbarService', () => {
  let service: ToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} },
            provideHttpClient(),
            provideHttpClientTesting(),
            provideAnimations()
        ]
    });
    service = TestBed.inject(ToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
