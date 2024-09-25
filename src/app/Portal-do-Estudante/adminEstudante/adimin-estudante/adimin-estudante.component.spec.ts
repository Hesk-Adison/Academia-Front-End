import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiminEstudanteComponent } from './adimin-estudante.component';

describe('AdiminEstudanteComponent', () => {
  let component: AdiminEstudanteComponent;
  let fixture: ComponentFixture<AdiminEstudanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdiminEstudanteComponent]
    });
    fixture = TestBed.createComponent(AdiminEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
