import { TestBed } from '@angular/core/testing';

import { MiscDialogService } from './misc-dialog.service';

describe('MiscDialogService', () => {
  let service: MiscDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiscDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
