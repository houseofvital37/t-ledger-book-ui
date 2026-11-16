import { TestBed } from '@angular/core/testing';

import { InstallmentRulesService } from './installment-rules.service';

describe('InstallmentRulesService', () => {
  let service: InstallmentRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallmentRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
