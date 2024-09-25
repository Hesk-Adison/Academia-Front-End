import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallancamentoComponent } from './modallancamento.component';

describe('ModallancamentoComponent', () => {
  let component: ModallancamentoComponent;
  let fixture: ComponentFixture<ModallancamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModallancamentoComponent]
    });
    fixture = TestBed.createComponent(ModallancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
