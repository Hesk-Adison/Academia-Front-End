import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisciplinasComponent } from './modal-disciplinas.component';

describe('ModalDisciplinasComponent', () => {
  let component: ModalDisciplinasComponent;
  let fixture: ComponentFixture<ModalDisciplinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDisciplinasComponent]
    });
    fixture = TestBed.createComponent(ModalDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
