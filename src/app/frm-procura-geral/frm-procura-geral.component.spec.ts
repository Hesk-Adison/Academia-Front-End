import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmProcuraGeralComponent } from './frm-procura-geral.component';

describe('FrmProcuraGeralComponent', () => {
  let component: FrmProcuraGeralComponent;
  let fixture: ComponentFixture<FrmProcuraGeralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmProcuraGeralComponent]
    });
    fixture = TestBed.createComponent(FrmProcuraGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
