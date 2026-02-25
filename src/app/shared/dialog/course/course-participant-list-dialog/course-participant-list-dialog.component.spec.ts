import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseParticipantListDialogComponent } from './course-participant-list-dialog.component';

describe('CourseParticipantListDialogComponent', () => {
  let component: CourseParticipantListDialogComponent;
  let fixture: ComponentFixture<CourseParticipantListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseParticipantListDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseParticipantListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
