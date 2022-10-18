import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {Observable} from "rxjs";
import {DomainPokemon} from "../models/pokemon.models";
import {AppService} from "../../../core/services/app.service";
import {RequestStatus} from "../../../core/models/app.models";
import {Location} from "@angular/common";

@Component({
  selector: "pd-pokemon",
  templateUrl: "./pokemon.component.html",
  styleUrls: [
    "../../../app.component.css",
    "./pokemon.component.css",
  ],
})
export class PokemonComponent implements OnInit {
  nameParam = "";
  appStatus$!: Observable<RequestStatus>;
  pokemon$!: Observable<DomainPokemon>;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private appService: AppService,
    private location: Location,
  ) {
  };

  ngOnInit() {
    this.nameParam = this.route.snapshot.paramMap.get("nameParam")!;
    this.appStatus$ = this.appService.appStatus$;
    this.getPokemon();
  };

  getPokemon() {
    this.pokemonService.getPokemon(this.nameParam);
    this.pokemon$ = this.pokemonService.pokemon$;
  };

  goBack() {
    this.location.back();
  };

  addToDeck() {
    this.pokemonService.addToDeck();
  };
}
