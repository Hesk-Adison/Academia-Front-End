import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTrabalhoComponent } from './ver-trabalho.component';

describe('VerTrabalhoComponent', () => {
  let component: VerTrabalhoComponent;
  let fixture: ComponentFixture<VerTrabalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerTrabalhoComponent]
    });
    fixture = TestBed.createComponent(VerTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
