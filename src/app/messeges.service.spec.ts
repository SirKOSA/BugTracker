import { TestBed } from '@angular/core/testing';

import { MessegesService } from './messeges.service';

describe('MessegesService', () => {
  let service: MessegesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessegesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
