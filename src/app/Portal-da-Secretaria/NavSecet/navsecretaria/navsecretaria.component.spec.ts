import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsecretariaComponent } from './navsecretaria.component';

describe('NavsecretariaComponent', () => {
  let component: NavsecretariaComponent;
  let fixture: ComponentFixture<NavsecretariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavsecretariaComponent]
    });
    fixture = TestBed.createComponent(NavsecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
