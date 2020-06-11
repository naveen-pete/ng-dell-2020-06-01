import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppValidators } from '../../shared/app-validators';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { State } from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  form: FormGroup;
  isLoading = false;

  private loadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.loadingSub = this.store.select('loading').subscribe(loading => {
      this.isLoading = loading;
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, AppValidators.isEmailTakenSync]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthdate: new FormControl('', Validators.required),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const userInfo: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.authService.registerUser(userInfo);
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  get agree() {
    return this.form.get('agree');
  }

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

}
