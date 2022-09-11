import { TestBed } from '@angular/core/testing';

import { FoosballService } from './foosball.service';

describe('FoosballService', () => {
  let service: FoosballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoosballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
