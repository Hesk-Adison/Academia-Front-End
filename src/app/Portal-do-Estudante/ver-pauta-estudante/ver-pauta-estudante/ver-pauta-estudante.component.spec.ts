import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPautaEstudanteComponent } from './ver-pauta-estudante.component';

describe('VerPautaEstudanteComponent', () => {
  let component: VerPautaEstudanteComponent;
  let fixture: ComponentFixture<VerPautaEstudanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPautaEstudanteComponent]
    });
    fixture = TestBed.createComponent(VerPautaEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
