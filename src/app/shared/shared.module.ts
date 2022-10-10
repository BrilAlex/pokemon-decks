import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {PaginationComponent} from "./components/pagination/pagination.component";

@NgModule({
  declarations: [
    HeaderComponent,
    PreloaderComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
    PaginationComponent,
  ],
})
export class SharedModule {
}
