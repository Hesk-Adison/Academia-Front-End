import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaComponent } from './turma.component';

describe('TurmaComponent', () => {
  let component: TurmaComponent;
  let fixture: ComponentFixture<TurmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurmaComponent]
    });
    fixture = TestBed.createComponent(TurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
