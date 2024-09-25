import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalhorarioComponent } from './modalhorario.component';

describe('ModalhorarioComponent', () => {
  let component: ModalhorarioComponent;
  let fixture: ComponentFixture<ModalhorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalhorarioComponent]
    });
    fixture = TestBed.createComponent(ModalhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
