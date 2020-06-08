import { Component, OnInit, OnDestroy } from '@angular/core';

import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;

  private exerciseSub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.runningExerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );

  }

  ngOnDestroy() {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }

}
