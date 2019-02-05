import { TestBed } from '@angular/core/testing';

import { DoctorServiceService } from './doctor-service.service';

describe('DoctorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorServiceService = TestBed.get(DoctorServiceService);
    expect(service).toBeTruthy();
  });
});
