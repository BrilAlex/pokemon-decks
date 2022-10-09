import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./features/pokemon-list/pokemon-list.module").then((m) => m.PokemonListModule),
  },
  {
    path: "pokemon",
    loadChildren: () => import("./features/pokemon/pokemon.module").then((m) => m.PokemonModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
