import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEliminarTrbajadorComponent } from './alert-eliminar-trbajador.component';

describe('AlertEliminarTrbajadorComponent', () => {
  let component: AlertEliminarTrbajadorComponent;
  let fixture: ComponentFixture<AlertEliminarTrbajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertEliminarTrbajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertEliminarTrbajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
