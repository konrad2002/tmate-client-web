import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionNodeComponent } from './condition-node.component';

describe('ConditionNodeComponent', () => {
  let component: ConditionNodeComponent;
  let fixture: ComponentFixture<ConditionNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
