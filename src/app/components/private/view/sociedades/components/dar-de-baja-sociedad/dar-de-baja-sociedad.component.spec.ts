import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarDeBajaSociedadComponent } from './dar-de-baja-sociedad.component';

describe('DarDeBajaSociedadComponent', () => {
  let component: DarDeBajaSociedadComponent;
  let fixture: ComponentFixture<DarDeBajaSociedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarDeBajaSociedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarDeBajaSociedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
