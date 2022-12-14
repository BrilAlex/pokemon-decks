import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PokemonRoutingModule} from "./pokemon-routing.module";
import {PokemonComponent} from "./components/pokemon.component";
import {PokemonService} from "./services/pokemon.service";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    PokemonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PokemonRoutingModule,
  ],
  providers: [
    PokemonService,
  ],
})
export class PokemonModule {
}
