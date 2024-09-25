import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorreportComponent } from './geradorreport.component';

describe('GeradorreportComponent', () => {
  let component: GeradorreportComponent;
  let fixture: ComponentFixture<GeradorreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeradorreportComponent]
    });
    fixture = TestBed.createComponent(GeradorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
