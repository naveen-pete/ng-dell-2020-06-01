import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;

  exercises: Exercise[] = [];
  isLoading = false;

  private exerciseSub: Subscription;
  private loadingSub: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );

    this.exerciseSub = this.trainingService.availableExercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining() {
    this.trainingService.startExercise(this.form.value.exercise);
  }

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }

    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }
}
