import { TestBed } from '@angular/core/testing';

import { AuthuServiceService } from './authu-service.service';

describe('AuthuServiceService', () => {
  let service: AuthuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
