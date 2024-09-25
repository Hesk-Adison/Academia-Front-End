import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstudantesComponent } from './modal-estudantes.component';

describe('ModalEstudantesComponent', () => {
  let component: ModalEstudantesComponent;
  let fixture: ComponentFixture<ModalEstudantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEstudantesComponent]
    });
    fixture = TestBed.createComponent(ModalEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
