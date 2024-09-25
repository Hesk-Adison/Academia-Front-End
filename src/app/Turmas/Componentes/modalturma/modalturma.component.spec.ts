import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalturmaComponent } from './modalturma.component';

describe('ModalturmaComponent', () => {
  let component: ModalturmaComponent;
  let fixture: ComponentFixture<ModalturmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalturmaComponent]
    });
    fixture = TestBed.createComponent(ModalturmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
