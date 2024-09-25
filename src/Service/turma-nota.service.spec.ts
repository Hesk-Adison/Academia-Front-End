import { TestBed } from '@angular/core/testing';

import { TurmaNotaService } from './turma-nota.service';

describe('TurmaNotaService', () => {
  let service: TurmaNotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurmaNotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
