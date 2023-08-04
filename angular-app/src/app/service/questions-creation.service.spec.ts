import { TestBed } from '@angular/core/testing';

import { QuestionsCreationService } from './questions-creation.service';

describe('QuestionsCreationService', () => {
  let service: QuestionsCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
