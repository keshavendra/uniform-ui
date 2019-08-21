import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotDetailComponentComponent } from './lot-detail-component.component';

describe('LotDetailComponentComponent', () => {
  let component: LotDetailComponentComponent;
  let fixture: ComponentFixture<LotDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
