import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  private exerciseSubscription: Subscription;

  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.availableExercisesChanged.subscribe(
      exercises => this.exercises = exercises
    );

    this.trainingService.fetchAvailableExercises();
    // .subscribe(
    //   exercises => {
    //     this.exercises = exercises;
    //   },
    //   error => {
    //     console.log('Fetch available exercises failed.');
    //     console.log('Error:', error);
    //   }
    // );
  }

  onStartTraining() {
    this.trainingService.startExercise(this.form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
