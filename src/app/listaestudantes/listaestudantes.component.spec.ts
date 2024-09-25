import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaestudantesComponent } from './listaestudantes.component';

describe('ListaestudantesComponent', () => {
  let component: ListaestudantesComponent;
  let fixture: ComponentFixture<ListaestudantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaestudantesComponent]
    });
    fixture = TestBed.createComponent(ListaestudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
