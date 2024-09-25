import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolhertipotesteComponent } from './escolhertipoteste.component';

describe('EscolhertipotesteComponent', () => {
  let component: EscolhertipotesteComponent;
  let fixture: ComponentFixture<EscolhertipotesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EscolhertipotesteComponent]
    });
    fixture = TestBed.createComponent(EscolhertipotesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
