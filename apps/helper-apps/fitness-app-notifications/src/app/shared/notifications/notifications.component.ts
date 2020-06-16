import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = 'BC506Dc3cB1qO-5WDIbUZG9AUiiCERMBrR_8hjQAYcoGDNDB8Dej8j4Yt0XMVXUe5IRZ7BE78UGGtyVGsBWhoB4';

  sub: PushSubscription;

  constructor(
    private swPush: SwPush,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log('subscription:', sub);
        this.sub = sub;
        this.notificationsService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to the server.'),
          err => {
            console.log('Could not send subscription object to server.');
            console.log('Error:', err);
          }
        )
      })
      .catch(err => {
        console.log('Subscribe to notifications failed.');
        console.log('Error:', err);
      });
  }

  sendNotifications() {
    console.log('Sending notifications to all subscribers...');
    this.notificationsService.send().subscribe(
      () => console.log('Send notifications successful.'),
      err => {
        console.log('Send notifications failed.');
        console.log('Error:', err);
      }
    );
  }

}
