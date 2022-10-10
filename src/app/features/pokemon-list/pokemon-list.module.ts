import {NgModule} from "@angular/core";
import {PokemonListComponent} from "./components/pokemon-list.component";
import {PokemonListRoutingModule} from "./pokemon-list-routing.module";
import {PokemonListService} from "./services/pokemon-list.service";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    PokemonListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PokemonListRoutingModule,
  ],
  providers: [
    PokemonListService
  ],
})
export class PokemonListModule {
}
