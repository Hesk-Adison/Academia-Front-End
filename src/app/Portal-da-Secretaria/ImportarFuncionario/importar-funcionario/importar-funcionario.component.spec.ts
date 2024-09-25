import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarFuncionarioComponent } from './importar-funcionario.component';

describe('ImportarFuncionarioComponent', () => {
  let component: ImportarFuncionarioComponent;
  let fixture: ComponentFixture<ImportarFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportarFuncionarioComponent]
    });
    fixture = TestBed.createComponent(ImportarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
