import { TestBed } from '@angular/core/testing';

import { QueryDialogService } from './query-dialog.service';

describe('QueryDialogService', () => {
  let service: QueryDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
