import { TestBed, inject } from '@angular/core/testing';

import { Req2} from './get-public-data.service';

describe('Req2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Req2]
    });
  });

  it('should be created', inject([Req2], (service: Req2) => {
    expect(service).toBeTruthy();
  }));
});
