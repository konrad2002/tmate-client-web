import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseParticipantAddDialogComponent } from './course-participant-add-dialog.component';

describe('CourseParticipantAddDialogComponent', () => {
  let component: CourseParticipantAddDialogComponent;
  let fixture: ComponentFixture<CourseParticipantAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseParticipantAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseParticipantAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
