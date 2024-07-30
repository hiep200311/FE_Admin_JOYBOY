import { TestBed } from '@angular/core/testing';

import { GetAllProductService } from './get-all-product.service';

describe('GetAllProductService', () => {
  let service: GetAllProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
