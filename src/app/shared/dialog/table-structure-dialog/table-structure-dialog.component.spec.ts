import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStructureDialogComponent } from './table-structure-dialog.component';

describe('TableStructureDialogComponent', () => {
  let component: TableStructureDialogComponent;
  let fixture: ComponentFixture<TableStructureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableStructureDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableStructureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
