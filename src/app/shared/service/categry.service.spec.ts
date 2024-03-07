import { TestBed } from '@angular/core/testing';

import { CategryService } from './categry.service';

describe('CategryService', () => {
  let service: CategryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
