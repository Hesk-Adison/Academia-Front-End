import { TestBed } from '@angular/core/testing';

import { TimeoutServiceService } from './timeout-service.service';

describe('TimeoutServiceService', () => {
  let service: TimeoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
