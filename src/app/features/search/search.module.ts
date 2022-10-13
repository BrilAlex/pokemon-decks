import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SearchComponent} from "./components/search.component";
import {FormsModule} from "@angular/forms";
import {SearchService} from "./service/search.service";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    SearchComponent,
  ],
  providers: [
    SearchService,
  ],
})
export class SearchModule {
}
