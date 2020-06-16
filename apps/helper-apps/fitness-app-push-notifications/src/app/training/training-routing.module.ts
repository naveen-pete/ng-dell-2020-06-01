import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';

const trainingRoutes: Routes = [
  { path: '', component: TrainingComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(trainingRoutes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }