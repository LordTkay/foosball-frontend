import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {gamesResolver} from './games.resolver';
import {Games} from "./game/game.model";

describe('gamesResolver', () => {
  const executeResolver: ResolveFn<Games> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => gamesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
