import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  // @Output() trainingExit = new EventEmitter<void>();

  progress = 0;
  timer: number;

  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }


  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;

    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        // Exercise is 100% complete
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
          // Exercise cancelled in between
          this.trainingService.cancelExercise(this.progress);
        } else {
          this.startOrResumeTimer();
        }
      }
    );
  }

}
