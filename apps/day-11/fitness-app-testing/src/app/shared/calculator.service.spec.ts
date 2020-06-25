import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let loggerSpy: any;
  let service: CalculatorService;

  // beforeAll();
  // afterAll();

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    service = new CalculatorService(loggerSpy);
  });

  afterEach(() => {
    // clean up
  });

  it('should add 2 numbers', () => {
    const result = service.add(10, 20);

    expect(result).toBe(30);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    const result = service.subtract(5, 1);

    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});



