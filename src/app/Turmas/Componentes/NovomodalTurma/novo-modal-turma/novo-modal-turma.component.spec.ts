import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoModalTurmaComponent } from './novo-modal-turma.component';

describe('NovoModalTurmaComponent', () => {
  let component: NovoModalTurmaComponent;
  let fixture: ComponentFixture<NovoModalTurmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoModalTurmaComponent]
    });
    fixture = TestBed.createComponent(NovoModalTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
