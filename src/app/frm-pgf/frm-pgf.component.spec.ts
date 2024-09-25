import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPgfComponent } from './frm-pgf.component';

describe('FrmPgfComponent', () => {
  let component: FrmPgfComponent;
  let fixture: ComponentFixture<FrmPgfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmPgfComponent]
    });
    fixture = TestBed.createComponent(FrmPgfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
