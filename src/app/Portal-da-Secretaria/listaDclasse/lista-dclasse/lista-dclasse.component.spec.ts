import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDclasseComponent } from './lista-dclasse.component';

describe('ListaDclasseComponent', () => {
  let component: ListaDclasseComponent;
  let fixture: ComponentFixture<ListaDclasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDclasseComponent]
    });
    fixture = TestBed.createComponent(ListaDclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
