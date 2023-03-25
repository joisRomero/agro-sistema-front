import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroquimicosComponent } from './agroquimicos.component';

describe('AgroquimicosComponent', () => {
  let component: AgroquimicosComponent;
  let fixture: ComponentFixture<AgroquimicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgroquimicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgroquimicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
