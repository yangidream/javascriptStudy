import { TestBed, inject } from '@angular/core/testing';

import { StockFormService } from './stock-form.service';

describe('StockFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockFormService]
    });
  });

  it('should be created', inject([StockFormService], (service: StockFormService) => {
    expect(service).toBeTruthy();
  }));
});
