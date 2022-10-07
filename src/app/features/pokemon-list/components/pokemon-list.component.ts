import {Component, OnInit} from "@angular/core";
import {PokemonListService} from "../services/pokemon-list.service";
import {PokemonListItem} from "../models/pokemon-list.models";
import {Observable} from "rxjs";

@Component({
  selector: "pd-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.css"],
})
export class PokemonListComponent implements OnInit {
  pokemonList$!: Observable<PokemonListItem[]>;

  constructor(private pokemonListService: PokemonListService) {};

  ngOnInit(): void {
    this.pokemonListService.getPokemonList();
    this.pokemonList$ = this.pokemonListService.pokemonList$;
  };
}
