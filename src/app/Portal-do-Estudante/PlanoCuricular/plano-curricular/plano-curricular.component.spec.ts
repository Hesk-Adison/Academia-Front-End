import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoCurricularComponent } from './plano-curricular.component';

describe('PlanoCurricularComponent', () => {
  let component: PlanoCurricularComponent;
  let fixture: ComponentFixture<PlanoCurricularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoCurricularComponent]
    });
    fixture = TestBed.createComponent(PlanoCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
