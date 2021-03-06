import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { AppState } from '../../store/app.reducer';
import { LoginStart } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;

  private loadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loadingSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
    });

    this.form = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', Validators.required)
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

    this.store.dispatch(new LoginStart(userInfo));
    // this.authService.login(userInfo);
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

}
