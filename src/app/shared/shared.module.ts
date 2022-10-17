import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {NotificationComponent} from "./components/notification/notification.component";
import {SearchModule} from "../features/search/search.module";
import {AppErrorPageComponent} from "./components/app-error-page/app-error-page.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    PreloaderComponent,
    PaginationComponent,
    NotificationComponent,
    AppErrorPageComponent,
  ],
  imports: [
    CommonModule,
    SearchModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
    PaginationComponent,
    NotificationComponent,
    AppErrorPageComponent,
  ],
})
export class SharedModule {
}
