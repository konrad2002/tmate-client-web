import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDialogComponent } from './help-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpDialogComponent],
        providers: [
            {provide: MAT_DIALOG_DATA, useValue: {}},
            {provide: MatDialogRef, useValue: {}},
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
