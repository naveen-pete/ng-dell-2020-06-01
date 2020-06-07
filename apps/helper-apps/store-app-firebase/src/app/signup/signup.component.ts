import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AuthData } from '../models/auth-data';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  showMessage = false;
  success = false;

  response: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const authData: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.authService.signup(authData).subscribe(
      responseData => {
        console.log('Signup successful.');
        console.log('responseData:', responseData);
        this.showMessage = true;
        this.success = true;
        this.response = { ...responseData };

        this.form.reset();
      },
      error => {
        console.log('Signup failed.');
        console.log('Error:', error);
        this.showMessage = true;
        this.success = false;
        this.response = {
          errorCode: error.error.error.code,
          errorMessage: error.error.error.message
        }
      }
    );
  }

  onClearMessage() {
    this.showMessage = false;
    this.success = false;
  }

}
