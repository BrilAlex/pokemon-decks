import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon.models";
import {AppService} from "../../../core/services/app.service";
import {RequestStatus} from "../../../core/models/app.models";

@Component({
  selector: "pd-pokemon",
  templateUrl: "./pokemon.component.html",
  styleUrls: [
    "./pokemon.component.css",
    "../../../app.component.css",
  ],
})
export class PokemonComponent implements OnInit {
  nameParam = "";
  appStatus$!: Observable<RequestStatus>;
  pokemon$!: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private appService: AppService,
  ) {};

  ngOnInit() {
    this.nameParam = this.route.snapshot.paramMap.get("nameParam")!;
    this.appStatus$ = this.appService.appStatus$;
    this.getPokemon();
  };

  getPokemon() {
    this.pokemonService.getPokemon(this.nameParam);
    this.pokemon$ = this.pokemonService.pokemon$;
  };
}
