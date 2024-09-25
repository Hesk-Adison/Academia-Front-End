import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMediaComponent } from './form-media.component';

describe('FormMediaComponent', () => {
  let component: FormMediaComponent;
  let fixture: ComponentFixture<FormMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMediaComponent]
    });
    fixture = TestBed.createComponent(FormMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
