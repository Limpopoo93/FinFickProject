import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunFicTableComponent } from './fun-fic-table.component';

describe('FunFicTableComponent', () => {
  let component: FunFicTableComponent;
  let fixture: ComponentFixture<FunFicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunFicTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunFicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
