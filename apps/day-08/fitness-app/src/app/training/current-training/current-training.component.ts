import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';

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

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;

    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
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
  }

}
