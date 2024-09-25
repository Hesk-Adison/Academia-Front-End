import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancaTrabalhoComponent } from './lanca-trabalho.component';

describe('LancaTrabalhoComponent', () => {
  let component: LancaTrabalhoComponent;
  let fixture: ComponentFixture<LancaTrabalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancaTrabalhoComponent]
    });
    fixture = TestBed.createComponent(LancaTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
