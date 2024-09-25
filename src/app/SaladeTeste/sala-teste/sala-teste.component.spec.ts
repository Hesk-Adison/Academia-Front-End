import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaTesteComponent } from './sala-teste.component';

describe('SalaTesteComponent', () => {
  let component: SalaTesteComponent;
  let fixture: ComponentFixture<SalaTesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaTesteComponent]
    });
    fixture = TestBed.createComponent(SalaTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
