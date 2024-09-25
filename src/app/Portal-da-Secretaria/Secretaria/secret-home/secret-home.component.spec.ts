import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretHomeComponent } from './secret-home.component';

describe('SecretHomeComponent', () => {
  let component: SecretHomeComponent;
  let fixture: ComponentFixture<SecretHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretHomeComponent]
    });
    fixture = TestBed.createComponent(SecretHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
