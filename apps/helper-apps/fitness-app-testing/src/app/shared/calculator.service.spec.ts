import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let loggerSpy: any;
  let calculator: CalculatorService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });

    calculator = TestBed.get(CalculatorService);
  });

  it('should add 2 numbers', () => {
    const result = calculator.add(3, 4);

    expect(result).toBe(7, 'Unexpected addition result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    const result = calculator.subtract(5, 3);

    expect(result).toBe(2, 'Unexpected subtraction result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});
