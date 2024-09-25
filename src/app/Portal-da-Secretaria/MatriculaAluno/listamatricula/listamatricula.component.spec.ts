import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamatriculaComponent } from './listamatricula.component';

describe('ListamatriculaComponent', () => {
  let component: ListamatriculaComponent;
  let fixture: ComponentFixture<ListamatriculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListamatriculaComponent]
    });
    fixture = TestBed.createComponent(ListamatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
