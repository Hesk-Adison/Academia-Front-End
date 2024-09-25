import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEstudanteComponent } from './nav-estudante.component';

describe('NavEstudanteComponent', () => {
  let component: NavEstudanteComponent;
  let fixture: ComponentFixture<NavEstudanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavEstudanteComponent]
    });
    fixture = TestBed.createComponent(NavEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
