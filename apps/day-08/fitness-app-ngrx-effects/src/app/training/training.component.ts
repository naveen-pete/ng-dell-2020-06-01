import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;

  private exerciseSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.exerciseSub = this.store.select('currentExercise').subscribe(
      exercise => {
        this.ongoingTraining = !!exercise;
      }
    );

  }

  ngOnDestroy() {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }

}
