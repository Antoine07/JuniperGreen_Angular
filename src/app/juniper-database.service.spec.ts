import { TestBed, inject } from '@angular/core/testing';

import { JuniperDatabaseService } from './juniper-database.service';

describe('JuniperDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JuniperDatabaseService]
    });
  });

  it('should be created', inject([JuniperDatabaseService], (service: JuniperDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
