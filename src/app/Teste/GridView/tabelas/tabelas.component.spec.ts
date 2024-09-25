import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasComponent } from './tabelas.component';

describe('TabelasComponent', () => {
  let component: TabelasComponent;
  let fixture: ComponentFixture<TabelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelasComponent]
    });
    fixture = TestBed.createComponent(TabelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
