import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, forkJoin, map, Observable, switchMap, tap} from "rxjs";
import {PokemonListData, PokemonListResponse} from "../models/pokemon-list.models";
import {environment} from "../../../../environments/environment";
import {AppService} from "../../../core/services/app.service";
import {Pokemon} from "../../pokemon/models/pokemon.models";
import {NotificationService} from "../../../core/services/notification.service";

@Injectable()
export class PokemonListService {
  private pokemonListData = new BehaviorSubject<PokemonListData>({} as PokemonListData);
  pokemonListData$ = this.pokemonListData.asObservable();

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private notificationService: NotificationService,
  ) {
  };

  getPokemonListData(params: {limit: number, offset: number}) {
    this.appService.setAppStatus("loading");
    this.http
      .get<PokemonListResponse>(`${environment.baseURL}/pokemon`, {params})
      .pipe(
        catchError(this.handleRequestError.bind(this)),
        switchMap((response): Observable<PokemonListData> => {
          const detailedResults = response.results.map(r => this.http.get<Pokemon>(r.url));

          return forkJoin(detailedResults)
            .pipe(
              catchError(this.handleRequestError.bind(this)),
              map(results => (
                {
                  results,
                  offset: params.offset,
                  limit: params.limit,
                  totalCount: response.count
                }
              )),
            );
        }),
        tap(() => this.appService.setAppStatus("idle")),
      )
      .subscribe(data => this.pokemonListData.next(data));
  };

  private handleRequestError(error: HttpErrorResponse) {
    const message = `${error.status}: ${error.statusText}`;
    this.notificationService.setNotification({message, type: "error"});
    this.appService.setAppStatus("error");
    return EMPTY;
  };
}
