import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEditarGastosComponent } from './nuevo-editar-gastos.component';

describe('NuevoEditarGastosComponent', () => {
  let component: NuevoEditarGastosComponent;
  let fixture: ComponentFixture<NuevoEditarGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEditarGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoEditarGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
