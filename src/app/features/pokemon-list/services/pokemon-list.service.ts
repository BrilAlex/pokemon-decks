import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {
  PokemonListData,
  PokemonListItem,
  PokemonListResponse,
  Result
} from "../models/pokemon-list.models";
import {environment} from "../../../../environments/environment";

@Injectable()
export class PokemonListService {
  private pokemonListData = new BehaviorSubject<PokemonListData>({} as PokemonListData);
  pokemonListData$ = this.pokemonListData.asObservable();

  constructor(private http: HttpClient) {
  };

  getPokemonListData(limit: number = 20, offset: number = 0) {
    this.http
      .get<PokemonListResponse>(`${environment.baseURL}/pokemon`, {params: {limit, offset}})
      .pipe(
        map((response): PokemonListData => {
          const results = response.results.map((r, i) => {
            const id = i + offset + 1;
            const imageUrl = `${environment.baseImageURL}/${id}.png`;
            return {...r, id, imageUrl}
          });
          return {results, offset, limit, totalCount: response.count};
        }),
      )
      .subscribe(data => this.pokemonListData.next(data));
  };

  swapPage(direction: -1 | 1) {
    const limit = this.pokemonListData.getValue().limit;
    const offset = this.pokemonListData.getValue().offset;
    this.getPokemonListData(limit, offset + limit * direction);
  }
}
