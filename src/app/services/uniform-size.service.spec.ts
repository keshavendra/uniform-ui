import { TestBed } from '@angular/core/testing';

import { UniformSizeService } from './uniform-size.service';

describe('UniformSizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniformSizeService = TestBed.get(UniformSizeService);
    expect(service).toBeTruthy();
  });
});
