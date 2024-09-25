import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaplanocurricularComponent } from './listaplanocurricular.component';

describe('ListaplanocurricularComponent', () => {
  let component: ListaplanocurricularComponent;
  let fixture: ComponentFixture<ListaplanocurricularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaplanocurricularComponent]
    });
    fixture = TestBed.createComponent(ListaplanocurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
