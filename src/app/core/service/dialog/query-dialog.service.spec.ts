import { TestBed } from '@angular/core/testing';

import { QueryDialogService } from './query-dialog.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('QueryDialogService', () => {
  let service: QueryDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
        ]
    });
    service = TestBed.inject(QueryDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
