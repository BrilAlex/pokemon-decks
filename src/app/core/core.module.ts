import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppService} from "./services/app.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AppService,
  ],
})
export class CoreModule {
}
