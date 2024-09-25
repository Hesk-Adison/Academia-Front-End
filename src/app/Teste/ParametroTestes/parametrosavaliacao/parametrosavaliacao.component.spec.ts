import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosavaliacaoComponent } from './parametrosavaliacao.component';

describe('ParametrosavaliacaoComponent', () => {
  let component: ParametrosavaliacaoComponent;
  let fixture: ComponentFixture<ParametrosavaliacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametrosavaliacaoComponent]
    });
    fixture = TestBed.createComponent(ParametrosavaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
