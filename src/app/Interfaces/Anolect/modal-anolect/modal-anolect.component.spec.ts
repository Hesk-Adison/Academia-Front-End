import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnolectComponent } from './modal-anolect.component';

describe('ModalAnolectComponent', () => {
  let component: ModalAnolectComponent;
  let fixture: ComponentFixture<ModalAnolectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAnolectComponent]
    });
    fixture = TestBed.createComponent(ModalAnolectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
