import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlauxiliarComponent } from './alauxiliar.component';

describe('AlauxiliarComponent', () => {
  let component: AlauxiliarComponent;
  let fixture: ComponentFixture<AlauxiliarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlauxiliarComponent]
    });
    fixture = TestBed.createComponent(AlauxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
