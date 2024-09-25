import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioClassComponent } from './diario-class.component';

describe('DiarioClassComponent', () => {
  let component: DiarioClassComponent;
  let fixture: ComponentFixture<DiarioClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiarioClassComponent]
    });
    fixture = TestBed.createComponent(DiarioClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
