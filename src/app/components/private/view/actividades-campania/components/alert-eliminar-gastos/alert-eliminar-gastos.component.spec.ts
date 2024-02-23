import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEliminarGastosComponent } from './alert-eliminar-gastos.component';

describe('AlertEliminarGastosComponent', () => {
  let component: AlertEliminarGastosComponent;
  let fixture: ComponentFixture<AlertEliminarGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEliminarGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertEliminarGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
