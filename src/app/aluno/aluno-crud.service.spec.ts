import { TestBed } from '@angular/core/testing';

import { AlunoCrudService } from './aluno-crud.service';

describe('AlunoCrudService', () => {
  let service: AlunoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
