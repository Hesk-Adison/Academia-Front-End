import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarProfessorComponent } from './importar-professor.component';

describe('ImportarProfessorComponent', () => {
  let component: ImportarProfessorComponent;
  let fixture: ComponentFixture<ImportarProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportarProfessorComponent]
    });
    fixture = TestBed.createComponent(ImportarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
