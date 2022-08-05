import { TestBed } from '@angular/core/testing';

import { CryptoSecurityService } from './crypto-security.service';

describe('CryptoSecurityService', () => {
  let service: CryptoSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
