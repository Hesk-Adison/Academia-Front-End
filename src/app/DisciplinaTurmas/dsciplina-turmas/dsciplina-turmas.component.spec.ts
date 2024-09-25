import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsciplinaTurmasComponent } from './dsciplina-turmas.component';

describe('DsciplinaTurmasComponent', () => {
  let component: DsciplinaTurmasComponent;
  let fixture: ComponentFixture<DsciplinaTurmasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsciplinaTurmasComponent]
    });
    fixture = TestBed.createComponent(DsciplinaTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
