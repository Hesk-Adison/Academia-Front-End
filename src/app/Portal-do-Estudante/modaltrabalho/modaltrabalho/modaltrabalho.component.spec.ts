import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltrabalhoComponent } from './modaltrabalho.component';

describe('ModaltrabalhoComponent', () => {
  let component: ModaltrabalhoComponent;
  let fixture: ComponentFixture<ModaltrabalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaltrabalhoComponent]
    });
    fixture = TestBed.createComponent(ModaltrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
