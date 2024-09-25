import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalproc2Component } from './modalproc2.component';

describe('Modalproc2Component', () => {
  let component: Modalproc2Component;
  let fixture: ComponentFixture<Modalproc2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Modalproc2Component]
    });
    fixture = TestBed.createComponent(Modalproc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
