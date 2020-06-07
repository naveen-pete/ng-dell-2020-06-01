import { Injectable } from '@angular/core';

import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 3, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 5, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 4, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 10, calories: 8 }
  ];

  private exercises: Exercise[] = [];

  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();

  getAvailableExercises() {
    return [...this.availableExercises];
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises() {
    return [...this.exercises];
  }

}