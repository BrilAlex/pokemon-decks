import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DeckPageComponent} from "./components/deck-page.component";

const routes: Routes = [
  {path: "", component: DeckPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckPageRoutingModule {
}
