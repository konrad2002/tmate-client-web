import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryEditorDialogComponent } from './query-editor-dialog.component';

describe('QueryEditorDialogComponent', () => {
  let component: QueryEditorDialogComponent;
  let fixture: ComponentFixture<QueryEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
