import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DeckPageComponent} from "./components/deck-page.component";
import {DeckPageRoutingModule} from "./deck-page-routing.module";

@NgModule({
  declarations: [
    DeckPageComponent,
  ],
  imports: [
    CommonModule,
    DeckPageRoutingModule,
  ],
})
export class DeckPageModule {
}
