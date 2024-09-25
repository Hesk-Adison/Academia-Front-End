import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmrclBuscaComponent } from './frmrcl-busca.component';

describe('FrmrclBuscaComponent', () => {
  let component: FrmrclBuscaComponent;
  let fixture: ComponentFixture<FrmrclBuscaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmrclBuscaComponent]
    });
    fixture = TestBed.createComponent(FrmrclBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
