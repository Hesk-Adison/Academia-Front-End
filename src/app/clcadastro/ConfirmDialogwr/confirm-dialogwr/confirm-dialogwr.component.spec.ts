import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogwrComponent } from './confirm-dialogwr.component';

describe('ConfirmDialogwrComponent', () => {
  let component: ConfirmDialogwrComponent;
  let fixture: ComponentFixture<ConfirmDialogwrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogwrComponent]
    });
    fixture = TestBed.createComponent(ConfirmDialogwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
