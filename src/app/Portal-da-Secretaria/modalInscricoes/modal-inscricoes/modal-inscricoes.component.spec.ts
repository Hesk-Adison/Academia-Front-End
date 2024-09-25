import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInscricoesComponent } from './modal-inscricoes.component';

describe('ModalInscricoesComponent', () => {
  let component: ModalInscricoesComponent;
  let fixture: ComponentFixture<ModalInscricoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInscricoesComponent]
    });
    fixture = TestBed.createComponent(ModalInscricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
