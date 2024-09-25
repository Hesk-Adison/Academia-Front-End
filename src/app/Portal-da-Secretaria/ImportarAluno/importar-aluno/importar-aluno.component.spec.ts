import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarAlunoComponent } from './importar-aluno.component';

describe('ImportarAlunoComponent', () => {
  let component: ImportarAlunoComponent;
  let fixture: ComponentFixture<ImportarAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportarAlunoComponent]
    });
    fixture = TestBed.createComponent(ImportarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
