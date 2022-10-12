import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppService} from "./services/app.service";
import {NotificationService} from "./services/notification.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AppService,
    NotificationService,
  ],
})
export class CoreModule {
}
