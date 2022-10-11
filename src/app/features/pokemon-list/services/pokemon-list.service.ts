import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, forkJoin, map, Observable, switchMap} from "rxjs";
import {PokemonListData, PokemonListResponse} from "../models/pokemon-list.models";
import {environment} from "../../../../environments/environment";
import {AppService} from "../../../core/services/app.service";
import {Pokemon} from "../../pokemon/models/pokemon.models";

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
        switchMap((response): Observable<PokemonListData> => {
          const detailedResults = response.results.map(r => this.http.get<Pokemon>(r.url));

          return forkJoin(detailedResults)
            .pipe(
              map(results => ({results, offset, limit, totalCount: response.count})),
            );
        }),
      )
      .subscribe(data => {
        this.pokemonListData.next(data);
        this.appService.setAppStatus("idle");
      });
  };

  changePage(limit: number, offset: number) {
    this.getPokemonListData(limit, offset);
  };
}
