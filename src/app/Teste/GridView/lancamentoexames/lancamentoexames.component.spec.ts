import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoexamesComponent } from './lancamentoexames.component';

describe('LancamentoexamesComponent', () => {
  let component: LancamentoexamesComponent;
  let fixture: ComponentFixture<LancamentoexamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentoexamesComponent]
    });
    fixture = TestBed.createComponent(LancamentoexamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
