import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditorDialogComponent } from './form-editor-dialog.component';

describe('FormEditorDialogComponent', () => {
  let component: FormEditorDialogComponent;
  let fixture: ComponentFixture<FormEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
