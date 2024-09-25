import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamesLancComponent } from './exames-lanc.component';

describe('ExamesLancComponent', () => {
  let component: ExamesLancComponent;
  let fixture: ComponentFixture<ExamesLancComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamesLancComponent]
    });
    fixture = TestBed.createComponent(ExamesLancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
