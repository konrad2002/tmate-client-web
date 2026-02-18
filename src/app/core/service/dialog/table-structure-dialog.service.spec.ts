import { TestBed } from '@angular/core/testing';

import { TableStructureDialogService } from './table-structure-dialog.service';

describe('TableStructureDialogService', () => {
  let service: TableStructureDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableStructureDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
