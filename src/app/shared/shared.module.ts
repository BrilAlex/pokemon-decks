import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {PreloaderComponent} from "./components/preloader/preloader.component";

@NgModule({
  declarations: [
    HeaderComponent,
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    PreloaderComponent,
  ],
})
export class SharedModule {
}
