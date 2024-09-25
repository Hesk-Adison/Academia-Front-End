import { TestBed } from '@angular/core/testing';

import { QuerryService } from './querry.service';

describe('QuerryService', () => {
  let service: QuerryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuerryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
