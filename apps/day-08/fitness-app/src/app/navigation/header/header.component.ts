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
  private authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(
      user => {
        this.isAuth = !!user;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
  }

}
