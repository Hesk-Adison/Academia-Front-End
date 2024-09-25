import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrelatorioComponent } from './modalrelatorio.component';

describe('ModalrelatorioComponent', () => {
  let component: ModalrelatorioComponent;
  let fixture: ComponentFixture<ModalrelatorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalrelatorioComponent]
    });
    fixture = TestBed.createComponent(ModalrelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
