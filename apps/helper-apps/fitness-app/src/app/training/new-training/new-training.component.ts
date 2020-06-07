import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  exercises: Exercise[] = [];
  private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.availableExercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );

    this.trainingService.fetchAvailableExercises();
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
