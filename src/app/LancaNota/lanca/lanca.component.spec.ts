import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancaComponent } from './LancaComponent';

describe('LancaComponent', () => {
  let component: LancaComponent;
  let fixture: ComponentFixture<LancaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancaComponent]
    });
    fixture = TestBed.createComponent(LancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
