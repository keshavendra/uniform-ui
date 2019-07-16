import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformSizeComponent } from './uniform-size.component';

describe('UniformSizeComponent', () => {
  let component: UniformSizeComponent;
  let fixture: ComponentFixture<UniformSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniformSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
