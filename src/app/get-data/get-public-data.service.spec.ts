import { TestBed, inject } from '@angular/core/testing';

import { GetPublicDataService } from './get-public-data.service';

describe('GetPublicDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPublicDataService]
    });
  });

  it('should be created', inject([GetPublicDataService], (service: GetPublicDataService) => {
    expect(service).toBeTruthy();
  }));
});
