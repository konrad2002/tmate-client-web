import { TestBed } from '@angular/core/testing';

import { QueryConversionService } from './query-conversion.service';

describe('QueryConversionService', () => {
  let service: QueryConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
