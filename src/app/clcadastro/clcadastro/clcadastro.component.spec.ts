import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClcadastroComponent } from './clcadastro.component';

describe('ClcadastroComponent', () => {
  let component: ClcadastroComponent;
  let fixture: ComponentFixture<ClcadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClcadastroComponent]
    });
    fixture = TestBed.createComponent(ClcadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
