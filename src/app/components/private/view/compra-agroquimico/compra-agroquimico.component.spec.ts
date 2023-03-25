import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraAgroquimicoComponent } from './compra-agroquimico.component';

describe('CompraAgroquimicoComponent', () => {
  let component: CompraAgroquimicoComponent;
  let fixture: ComponentFixture<CompraAgroquimicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraAgroquimicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraAgroquimicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
