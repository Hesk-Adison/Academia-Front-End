import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalplanoCurricularComponent } from './modalplano-curricular.component';

describe('ModalplanoCurricularComponent', () => {
  let component: ModalplanoCurricularComponent;
  let fixture: ComponentFixture<ModalplanoCurricularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalplanoCurricularComponent]
    });
    fixture = TestBed.createComponent(ModalplanoCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
