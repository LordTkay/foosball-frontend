import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionButtonComponent } from './player-selection-button.component';

describe('PlayerSelectionButtonComponent', () => {
  let component: PlayerSelectionButtonComponent;
  let fixture: ComponentFixture<PlayerSelectionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerSelectionButtonComponent]
    });
    fixture = TestBed.createComponent(PlayerSelectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
