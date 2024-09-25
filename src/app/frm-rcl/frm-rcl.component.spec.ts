import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRclComponent } from './frm-rcl.component';

describe('FrmRclComponent', () => {
  let component: FrmRclComponent;
  let fixture: ComponentFixture<FrmRclComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmRclComponent]
    });
    fixture = TestBed.createComponent(FrmRclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
