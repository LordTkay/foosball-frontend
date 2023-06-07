import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoosballComponent } from './foosball.component';

describe('FoosballComponent', () => {
    let component: FoosballComponent;
    let fixture: ComponentFixture<FoosballComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FoosballComponent]
        });
        fixture = TestBed.createComponent(FoosballComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
