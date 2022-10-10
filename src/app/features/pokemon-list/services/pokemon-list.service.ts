import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, tap} from "rxjs";
import {
  PokemonListData,
  PokemonListItem,
  PokemonListResponse,
  Result
} from "../models/pokemon-list.models";
import {environment} from "../../../../environments/environment";
import {AppService} from "../../../core/services/app.service";

@Injectable()
export class PokemonListService {
  private pokemonListData = new BehaviorSubject<PokemonListData>({} as PokemonListData);
  pokemonListData$ = this.pokemonListData.asObservable();

  constructor(private http: HttpClient, private appService: AppService) {
  };

  getPokemonListData(limit: number = 20, offset: number = 0) {
    this.appService.setAppStatus("loading");
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
      .subscribe(data => {
        this.pokemonListData.next(data);
        this.appService.setAppStatus("idle");
      });
  };

  swapPage(direction: -1 | 1) {
    const limit = this.pokemonListData.getValue().limit;
    const offset = this.pokemonListData.getValue().offset;
    this.getPokemonListData(limit, offset + limit * direction);
  }
}
