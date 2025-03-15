import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordDialogComponent } from './user-password-dialog.component';

describe('UserPasswordDialogComponent', () => {
  let component: UserPasswordDialogComponent;
  let fixture: ComponentFixture<UserPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPasswordDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
