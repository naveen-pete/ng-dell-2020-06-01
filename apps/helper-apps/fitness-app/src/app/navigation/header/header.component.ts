import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(
      user => {
        this.isAuth = !!user;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
