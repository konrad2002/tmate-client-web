import { TestBed } from '@angular/core/testing';

import { CourseDialogService } from './course-dialog.service';

describe('CourseDialogService', () => {
  let service: CourseDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
