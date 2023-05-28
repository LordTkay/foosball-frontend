import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {playersResolver} from './playersResolver';

describe('playersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => playersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
