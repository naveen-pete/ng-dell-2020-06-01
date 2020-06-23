import { Component, OnInit } from '@angular/core';

import { UserModel } from '../services/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import {
  SingleSpaProps,
  singleSpaPropsSubject,
} from '../../single-spa/single-spa-props';

@Component({
  selector: 'users-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  errorMessage: string;

  singleSpaProps: SingleSpaProps;
  subscription: Subscription;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      (props) => (this.singleSpaProps = props)
    );

    this.service.getUsers().subscribe(
      (users) => (this.users = users),
      (error) => (this.errorMessage = error.message)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
