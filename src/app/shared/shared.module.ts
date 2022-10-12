import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {NotificationComponent} from "./components/notification/notification.component";

@NgModule({
  declarations: [
    HeaderComponent,
    PreloaderComponent,
    PaginationComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
    PaginationComponent,
    NotificationComponent,
  ],
})
export class SharedModule {
}
