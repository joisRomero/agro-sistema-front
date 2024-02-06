import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEditarSociedadComponent } from './nuevo-editar-sociedad.component';

describe('NuevoEditarSociedadComponent', () => {
  let component: NuevoEditarSociedadComponent;
  let fixture: ComponentFixture<NuevoEditarSociedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEditarSociedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoEditarSociedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
