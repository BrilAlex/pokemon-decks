import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {PokemonListItem, PokemonListResponse} from "../models/pokemon-list.models";

@Injectable()
export class PokemonListService {
  private pokemonList = new BehaviorSubject<PokemonListItem[]>([]);
  pokemonList$ = this.pokemonList.asObservable();

  constructor(private http: HttpClient) {};

  getPokemonList() {
    this.http
      .get<PokemonListResponse>("https://pokeapi.co/api/v2/pokemon")
      .pipe(
        map((response) => response.results)
      )
      .subscribe(results => this.pokemonList.next(results));
  };
}
