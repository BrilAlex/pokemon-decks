import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon.models";

@Component({
  selector: "pd-pokemon",
  templateUrl: "./pokemon.component.html",
  styleUrls: [
    "./pokemon.component.css",
    "../../../app.component.css",
  ],
})
export class PokemonComponent implements OnInit {
  pokemon$!: Observable<Pokemon>;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {};

  ngOnInit() {
    const nameParam = this.route.snapshot.paramMap.get("nameParam")!;
    this.pokemon$ = this.pokemonService.getPokemon(nameParam);
  };
}
