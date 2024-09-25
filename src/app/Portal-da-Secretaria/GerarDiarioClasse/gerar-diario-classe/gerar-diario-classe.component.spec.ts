import { ComponentFixture, TestBed } from '@angular/core/testing';

import GerarDiarioClasseComponent from './gerar-diario-classe.component';

describe('GerarDiarioClasseComponent', () => {
  let component: GerarDiarioClasseComponent;
  let fixture: ComponentFixture<GerarDiarioClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerarDiarioClasseComponent]
    });
    fixture = TestBed.createComponent(GerarDiarioClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
