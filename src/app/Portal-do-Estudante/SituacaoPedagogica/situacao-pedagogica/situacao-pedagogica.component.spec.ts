import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoPedagogicaComponent } from './situacao-pedagogica.component';

describe('SituacaoPedagogicaComponent', () => {
  let component: SituacaoPedagogicaComponent;
  let fixture: ComponentFixture<SituacaoPedagogicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SituacaoPedagogicaComponent]
    });
    fixture = TestBed.createComponent(SituacaoPedagogicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
