import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelapagComponent } from './tabelapag.component';

describe('TabelapagComponent', () => {
  let component: TabelapagComponent;
  let fixture: ComponentFixture<TabelapagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelapagComponent]
    });
    fixture = TestBed.createComponent(TabelapagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
