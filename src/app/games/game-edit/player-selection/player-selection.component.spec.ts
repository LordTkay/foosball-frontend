import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionComponent } from './player-selection.component';

describe('PlayerSelectionComponent', () => {
  let component: PlayerSelectionComponent;
  let fixture: ComponentFixture<PlayerSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerSelectionComponent]
    });
    fixture = TestBed.createComponent(PlayerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
