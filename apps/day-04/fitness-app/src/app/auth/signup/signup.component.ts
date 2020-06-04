import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppValidators } from '../../common/app-validators';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
      password: this.form.value.password
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
}
