import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AppNotification} from "../models/notification.models";

@Injectable()
export class NotificationService {
  private notification = new BehaviorSubject<AppNotification | null>(null);
  notification$ = this.notification.asObservable();

  setNotification(notification: AppNotification) {
    this.notification.next(notification);
  };

  clearNotification() {
    this.notification.next(null);
  };
}
