import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teste1232Component } from './teste1232.component';

describe('Teste1232Component', () => {
  let component: Teste1232Component;
  let fixture: ComponentFixture<Teste1232Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Teste1232Component]
    });
    fixture = TestBed.createComponent(Teste1232Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
