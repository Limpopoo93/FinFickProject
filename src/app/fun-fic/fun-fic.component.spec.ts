import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunFicComponent } from './fun-fic.component';

describe('FunFicComponent', () => {
  let component: FunFicComponent;
  let fixture: ComponentFixture<FunFicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunFicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunFicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
