import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailDialogComponent } from './member-detail-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('MemberDetailDialogComponent', () => {
  let component: MemberDetailDialogComponent;
  let fixture: ComponentFixture<MemberDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
        providers: [
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} },
            provideHttpClient(),
            provideHttpClientTesting(),
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
