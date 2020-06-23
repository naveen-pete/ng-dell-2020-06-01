import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  SingleSpaProps,
  singleSpaPropsSubject,
} from '../../single-spa/single-spa-props';

import { UserModel } from '../services/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'users-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: UserModel;
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private service: UserService) {}

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      (props) => (this.singleSpaProps = props)
    );

    this.route.paramMap
      .pipe(
        switchMap((map) => {
          const id = +map.get('id');
          return this.service.getUser(id);
        })
      )
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
