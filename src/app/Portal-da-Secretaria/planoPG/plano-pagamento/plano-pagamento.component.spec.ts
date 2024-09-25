import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoPagamentoComponent } from './plano-pagamento.component';

describe('PlanoPagamentoComponent', () => {
  let component: PlanoPagamentoComponent;
  let fixture: ComponentFixture<PlanoPagamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoPagamentoComponent]
    });
    fixture = TestBed.createComponent(PlanoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
