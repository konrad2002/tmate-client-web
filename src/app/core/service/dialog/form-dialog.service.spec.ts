import { TestBed } from '@angular/core/testing';

import { FormDialogService } from './form-dialog.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('FormDialogService', () => {
  let service: FormDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
        ]
    });
    service = TestBed.inject(FormDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
