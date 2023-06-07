import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorComponent } from './http-error.component';

describe('ErrorComponent', () => {
  let component: HttpErrorComponent;
  let fixture: ComponentFixture<HttpErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpErrorComponent]
    });
    fixture = TestBed.createComponent(HttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
