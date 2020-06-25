import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { TrainingService } from "./training.service";
import { UIService } from '../shared/ui.service';
import { environment } from '../../environments/environment';
import { availableExercises, availableExercisesResponse } from "./training-test-data";

describe('TrainingService', () => {
  let service: TrainingService;
  let uiServiceSpy: any;
  let httpTestingController: HttpTestingController;
  const apiUrlAvailableExercises = `${environment.dataApiUrl}/available-exercises.json`;

  beforeEach(() => {
    uiServiceSpy = jasmine.createSpyObj('UIService', ['showSpinner', 'hideSpinner', 'showMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TrainingService,
        { provide: UIService, useValue: uiServiceSpy }
      ]
    });

    service = TestBed.get(TrainingService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should check if a HTTP GET request has been sent to the server', () => {
    service.fetchAvailableExercises();

    const req = httpTestingController.expectOne(apiUrlAvailableExercises);
    expect(req.request.method).toEqual('GET');
  });

  it('should check if UIService.showSpinner() method is called once', () => {
    service.fetchAvailableExercises();

    expect(uiServiceSpy.showSpinner).toHaveBeenCalledTimes(1);

    httpTestingController.expectOne(apiUrlAvailableExercises);
  });

  it('should check if available exercises is delivered to subscriber when the server response is successful', () => {
    service.availableExercisesChanged.subscribe(
      exercises => {
        expect(exercises).toBeTruthy();
        expect(exercises.length).toBe(2);

        const exercise = exercises.find(ex => ex.id === '2');
        expect(exercise.name).toBe('Plank');
        // expect(exercises).toEqual(availableExercises);
      }
    );

    service.fetchAvailableExercises();

    const req = httpTestingController.expectOne(apiUrlAvailableExercises);
    req.flush(availableExercisesResponse);

  });

});