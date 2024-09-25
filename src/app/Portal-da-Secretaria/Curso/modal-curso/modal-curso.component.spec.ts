import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCursoComponent } from './modal-curso.component';

describe('ModalCursoComponent', () => {
  let component: ModalCursoComponent;
  let fixture: ComponentFixture<ModalCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCursoComponent]
    });
    fixture = TestBed.createComponent(ModalCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
