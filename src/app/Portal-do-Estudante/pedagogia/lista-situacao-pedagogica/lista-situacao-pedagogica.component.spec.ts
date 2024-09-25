import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSituacaoPedagogicaComponent } from './lista-situacao-pedagogica.component';

describe('ListaSituacaoPedagogicaComponent', () => {
  let component: ListaSituacaoPedagogicaComponent;
  let fixture: ComponentFixture<ListaSituacaoPedagogicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSituacaoPedagogicaComponent]
    });
    fixture = TestBed.createComponent(ListaSituacaoPedagogicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
