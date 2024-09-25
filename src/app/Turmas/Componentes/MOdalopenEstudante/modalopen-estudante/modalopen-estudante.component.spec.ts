import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MOdalopenEstudanteComponent } from './modalopen-estudante.component';

describe('MOdalopenEstudanteComponent', () => {
  let component: MOdalopenEstudanteComponent;
  let fixture: ComponentFixture<MOdalopenEstudanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MOdalopenEstudanteComponent]
    });
    fixture = TestBed.createComponent(MOdalopenEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
