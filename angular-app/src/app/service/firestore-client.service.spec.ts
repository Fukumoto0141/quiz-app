import { TestBed } from '@angular/core/testing';

import { FirestoreClientService } from './firestore-client.service';

describe('FirestoreClientService', () => {
  let service: FirestoreClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
