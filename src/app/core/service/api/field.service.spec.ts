import { TestBed } from '@angular/core/testing';

import { FieldService } from './field.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('FieldService', () => {
  let service: FieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [

        ],
        providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
        ]
    });
    service = TestBed.inject(FieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
