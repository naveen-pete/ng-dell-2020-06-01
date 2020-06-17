import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  showMessage(message: string, action: string = null, duration: number = 3000) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }

  showSpinner() {
    this.loadingStateChanged.next(true);
  }

  hideSpinner() {
    this.loadingStateChanged.next(false);
  }

}