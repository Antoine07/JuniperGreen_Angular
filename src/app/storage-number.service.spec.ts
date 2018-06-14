import { TestBed, inject } from '@angular/core/testing';

import { StorageNumberService } from './storage-number.service';

describe('StorageNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageNumberService]
    });
  });

  it('should be created', inject([StorageNumberService], (service: StorageNumberService) => {
    expect(service).toBeTruthy();
  }));
});
