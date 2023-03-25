import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraAbonosComponent } from './compra-abonos.component';

describe('CompraAbonosComponent', () => {
  let component: CompraAbonosComponent;
  let fixture: ComponentFixture<CompraAbonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraAbonosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraAbonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
