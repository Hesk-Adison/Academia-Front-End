import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalprocdisciComponent } from './modalprocdisci.component';

describe('ModalprocdisciComponent', () => {
  let component: ModalprocdisciComponent;
  let fixture: ComponentFixture<ModalprocdisciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalprocdisciComponent]
    });
    fixture = TestBed.createComponent(ModalprocdisciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
