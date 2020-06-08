import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  availableExercisesChanged = new Subject<Exercise[]>();
  runningExerciseChanged = new Subject<Exercise>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private http: HttpClient) { }

  fetchAvailableExercises() {
    return this.http.get<Exercise[]>(`${environment.dataApiUrl}/available-exercises.json`)
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
          this.availableExercisesChanged.next([...this.availableExercises]);
        },
        error => {
          console.log('Fetch available exercises failed.');
          console.log('Error:', error);
        }
      );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.runningExerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
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
          console.log('Error:', error);
        }
      );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.http.post(`${environment.dataApiUrl}/finished-exercises.json`, exercise)
      .subscribe(
        () => {
          console.log('Save exercise successful.');
          this.runningExercise = null;
          this.runningExerciseChanged.next(null);
        },
        error => {
          console.log('Save exercise failed.');
          console.log('Error:', error);
        }
      );
  }


}