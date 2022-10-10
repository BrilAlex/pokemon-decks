import {Component, OnInit} from "@angular/core";
import {PokemonListService} from "../services/pokemon-list.service";
import {PokemonListData} from "../models/pokemon-list.models";
import {Observable} from "rxjs";
import {AppService} from "../../../core/services/app.service";
import {RequestStatus} from "../../../core/models/app.models";

@Component({
  selector: "pd-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: [
    "./pokemon-list.component.css",
    "../../../app.component.css",
  ],
})
export class PokemonListComponent implements OnInit {
  appStatus$!: Observable<RequestStatus>;
  pokemonListData$!: Observable<PokemonListData>;

  constructor(private pokemonListService: PokemonListService, private appService: AppService) {
  };

  ngOnInit(): void {
    this.appStatus$ = this.appService.appStatus$;
    this.getPokemonList();
  };

  getPokemonList() {
    this.pokemonListService.getPokemonListData();
    this.pokemonListData$ = this.pokemonListService.pokemonListData$;
  };

  swapPage(direction: -1 | 1) {
    this.pokemonListService.swapPage(direction);
  };
}
