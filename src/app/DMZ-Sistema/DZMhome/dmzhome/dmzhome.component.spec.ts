import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmzhomeComponent } from './dmzhome.component';

describe('DmzhomeComponent', () => {
  let component: DmzhomeComponent;
  let fixture: ComponentFixture<DmzhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DmzhomeComponent]
    });
    fixture = TestBed.createComponent(DmzhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
