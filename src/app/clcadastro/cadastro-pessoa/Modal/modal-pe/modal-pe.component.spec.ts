import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPeComponent } from './modal-pe.component';

describe('ModalPeComponent', () => {
  let component: ModalPeComponent;
  let fixture: ComponentFixture<ModalPeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPeComponent]
    });
    fixture = TestBed.createComponent(ModalPeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
