import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCursoComponent } from './app-curso.component';

describe('AppCursoComponent', () => {
  let component: AppCursoComponent;
  let fixture: ComponentFixture<AppCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCursoComponent]
    });
    fixture = TestBed.createComponent(AppCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
