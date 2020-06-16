import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-app';

  constructor(
    private authService: AuthService,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(
        () => {
          if (window.confirm('New version available. Load new version?')) {
            window.location.reload();
          }
        }
      );
    }

    this.authService.autoLogin();
  }
}
