import { TestBed } from '@angular/core/testing';

import { PlanopagamentoService } from './planopagamento.service';

describe('PlanopagamentoService', () => {
  let service: PlanopagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanopagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
