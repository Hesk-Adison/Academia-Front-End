import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnolectComponent } from './lista-anolect.component';

describe('ListaAnolectComponent', () => {
  let component: ListaAnolectComponent;
  let fixture: ComponentFixture<ListaAnolectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAnolectComponent]
    });
    fixture = TestBed.createComponent(ListaAnolectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
