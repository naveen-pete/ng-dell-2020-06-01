import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';
import { State } from '../../app.reducer';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: number;

  isLoading = false;

  private loadingSub: Subscription;
  private exerciseSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.exerciseSub = this.store.select('currentExercise').subscribe((exercise: Exercise) => {
      const step = exercise.duration / 100 * 1000;

      this.timer = window.setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          window.clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStop() {
    window.clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.trainingService.cancelExercise(this.progress);
        } else {
          this.startOrResumeTimer();
        }
      }
    );
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
