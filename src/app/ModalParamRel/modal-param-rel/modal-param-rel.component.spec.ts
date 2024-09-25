import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParamRelComponent } from './modal-param-rel.component';

describe('ModalParamRelComponent', () => {
  let component: ModalParamRelComponent;
  let fixture: ComponentFixture<ModalParamRelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalParamRelComponent]
    });
    fixture = TestBed.createComponent(ModalParamRelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
