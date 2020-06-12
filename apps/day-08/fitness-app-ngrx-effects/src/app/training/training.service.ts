import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import { AppState } from '../store/app.reducer';
import { SetCurrentExercise, ClearCurrentExercise } from './store/current-exercise.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: Exercise[] = [];
  private currentExercise: Exercise;

  availableExercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private http: HttpClient,
    private uiService: UIService,
    private store: Store<AppState>
  ) { }

  fetchAvailableExercises() {
    this.uiService.showSpinner();
    this.http.get<Exercise[]>(`${environment.dataApiUrl}/available-exercises.json`)
      .pipe(
        map(responseData => {
          const exercises: Exercise[] = [];
          const keys = Object.keys(responseData);

          keys.forEach(key => {
            exercises.push({
              ...responseData[key],
              id: key
            });
          });

          return exercises;
        })
      )
      .subscribe(
        exercises => {
          this.availableExercises = exercises;
          this.uiService.hideSpinner();
          this.availableExercisesChanged.next([...this.availableExercises]);
        },
        error => {
          console.log('Fetch available exercises failed.');
          this.uiService.hideSpinner();
          this.uiService.showMessage('Failed to fetch available exercises.');
          this.availableExercisesChanged.next(null);
        }
      );
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.store.dispatch(new SetCurrentExercise(this.currentExercise));
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    });
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
  }

  fetchFinishedExercises() {
    this.http.get<Exercise[]>(`${environment.dataApiUrl}/finished-exercises.json`)
      .pipe(
        map(responseData => {
          const exercises: Exercise[] = [];
          const keys = Object.keys(responseData);

          keys.forEach(key => {
            exercises.push({
              ...responseData[key]
            });
          });

          return exercises;
        })
      )
      .subscribe(
        exercises => {
          this.finishedExercisesChanged.next(exercises);
        },
        error => {
          console.log('Fetch finished exercises failed.');
          this.uiService.showMessage('Failed to fetch finished exercises.');
        }
      );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.uiService.showSpinner();
    this.http.post(`${environment.dataApiUrl}/finished-exercises.json`, exercise)
      .subscribe(
        () => {
          this.currentExercise = null;
          this.store.dispatch(new ClearCurrentExercise());

          this.uiService.hideSpinner();
        },
        error => {
          console.log('Save exercise failed.');

          this.uiService.hideSpinner();
          this.uiService.showMessage('Failed to save finished exercise.');
        }
      );
  }
}