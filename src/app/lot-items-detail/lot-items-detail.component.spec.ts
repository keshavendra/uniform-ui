import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotItemsDetailComponent } from './lot-items-detail.component';

describe('LotItemsDetailComponent', () => {
  let component: LotItemsDetailComponent;
  let fixture: ComponentFixture<LotItemsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotItemsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotItemsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
