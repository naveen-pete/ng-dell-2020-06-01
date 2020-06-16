import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: PushSubscription) {
    return this.http.post(`${environment.notificationsApiUrl}/notifications`, sub);
  }

  send() {
    return this.http.post(`${environment.notificationsApiUrl}/newsletter`, null);
  }

}