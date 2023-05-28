import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {playersResolver} from './playersResolver';
import {Players} from "./player/player.model";

describe('playersResolver', () => {
  const executeResolver: ResolveFn<Players> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => playersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
