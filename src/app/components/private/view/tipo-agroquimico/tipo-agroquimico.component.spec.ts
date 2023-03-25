import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAgroquimicoComponent } from './tipo-agroquimico.component';

describe('TipoAgroquimicoComponent', () => {
  let component: TipoAgroquimicoComponent;
  let fixture: ComponentFixture<TipoAgroquimicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAgroquimicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAgroquimicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
