import { TestBed } from '@angular/core/testing';

import { ServicesExpenseService } from './services-expense.service';

describe('ServicesExpenseService', () => {
  let service: ServicesExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
