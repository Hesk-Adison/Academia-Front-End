import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacaoComponent } from './facturacao.component';

describe('FacturacaoComponent', () => {
  let component: FacturacaoComponent;
  let fixture: ComponentFixture<FacturacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturacaoComponent]
    });
    fixture = TestBed.createComponent(FacturacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
