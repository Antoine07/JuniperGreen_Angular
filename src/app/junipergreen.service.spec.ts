import { TestBed, inject } from '@angular/core/testing';

import { JunipergreenService } from './junipergreen.service';

describe('JunipergreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JunipergreenService]
    });
  });

  it('should be created', inject([JunipergreenService], (service: JunipergreenService) => {
    expect(service).toBeTruthy();
  }));
});
