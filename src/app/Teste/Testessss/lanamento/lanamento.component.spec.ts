import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanamentoComponent } from './lanamento.component';

describe('LanamentoComponent', () => {
  let component: LanamentoComponent;
  let fixture: ComponentFixture<LanamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanamentoComponent]
    });
    fixture = TestBed.createComponent(LanamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
