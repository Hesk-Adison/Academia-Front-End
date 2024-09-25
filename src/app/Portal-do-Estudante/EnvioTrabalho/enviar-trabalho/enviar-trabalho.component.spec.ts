import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarTrabalhoComponent } from './enviar-trabalho.component';

describe('EnviarTrabalhoComponent', () => {
  let component: EnviarTrabalhoComponent;
  let fixture: ComponentFixture<EnviarTrabalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarTrabalhoComponent]
    });
    fixture = TestBed.createComponent(EnviarTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
