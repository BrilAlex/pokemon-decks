import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {AppNotification} from "../../../core/models/notification.models";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: "pd-notification",
  templateUrl: "./notification.component.html",
  styleUrls: [
    "./notification.component.css",
  ],
})
export class NotificationComponent implements OnInit {
  notification$!: Observable<AppNotification | null>;

  constructor(private notificationService: NotificationService) {
  };

  ngOnInit() {
    this.notification$ = this.notificationService.notification$;

    setTimeout(() => {
      this.notificationService.clearNotification();
    }, 5000);
  };
}
