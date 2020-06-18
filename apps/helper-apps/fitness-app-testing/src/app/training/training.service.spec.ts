import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { TrainingService } from "./training.service";
import { UIService } from '../shared/ui.service';
import { environment } from '../../environments/environment';

const availableExercisesResponse = {
  '1': { calories: 8, duration: 10, name: 'Push-ups' },
  '2': { calories: 10, duration: 5, name: 'Plank' }
};

const availableExercises = [
  { id: '1', calories: 8, duration: 10, name: 'Push-ups' },
  { id: '2', calories: 10, duration: 5, name: 'Plank' }
];

describe('TrainingService', () => {
  let service: TrainingService;
  let uiServiceSpy: any;
  let httpTestingController: HttpTestingController;
  const apiUrlAvailableExercises = `${environment.dataApiUrl}/available-exercises.json`;
  const apiUrlFinishedExercises = `${environment.dataApiUrl}/finished-exercises.json`;

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

  it('should check if UIService.hideSpinner() method is called when the server response is successful', () => {
    service.fetchAvailableExercises();

    const req = httpTestingController.expectOne(apiUrlAvailableExercises);
    req.flush('');

    expect(uiServiceSpy.hideSpinner).toHaveBeenCalled();
  });

  it('should check if UIService.showMessage() method is called when the server response fails', () => {
    service.fetchAvailableExercises();

    const req = httpTestingController.expectOne(apiUrlAvailableExercises);
    // req.error(new ErrorEvent(''));
    req.flush('Simulating error', { status: 500, statusText: 'Internal server error' });

    expect(uiServiceSpy.showMessage).toHaveBeenCalledWith('Failed to fetch available exercises.');
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

  it('should save a finished exercise', () => {
    service.runningExerciseChanged.subscribe(
      exercise => {
        expect(exercise).toBeNull();
      }
    );

    const exercise = { ...availableExercises[0] };

    service.setRunningExercise(exercise);
    service.completeExercise();

    const req = httpTestingController.expectOne(apiUrlFinishedExercises);

    expect(req.request.method).toEqual('POST');

    expect(req.request.body.name).toEqual(exercise.name);
    expect(req.request.body.state).toEqual('completed');

    req.flush('');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});