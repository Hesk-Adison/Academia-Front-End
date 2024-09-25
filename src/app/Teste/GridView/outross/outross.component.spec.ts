import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrossComponent } from './outross.component';

describe('OutrossComponent', () => {
  let component: OutrossComponent;
  let fixture: ComponentFixture<OutrossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutrossComponent]
    });
    fixture = TestBed.createComponent(OutrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
