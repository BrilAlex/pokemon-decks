import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PokemonComponent} from "./components/pokemon.component";

const routes: Routes = [
  {path: ":nameParam", component: PokemonComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class PokemonRoutingModule {
}
