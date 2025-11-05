import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopForm } from './workshop-form.component';

describe('WorkshopForm', () => {
  let component: WorkshopForm;
  let fixture: ComponentFixture<WorkshopForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
