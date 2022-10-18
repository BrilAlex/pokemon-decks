import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainPokemon, Pokemon} from "../models/pokemon.models";
import {
  BehaviorSubject,
  catchError, combineLatest,
  EMPTY,
  map,
  Observable,
  of,
  switchMap,
  tap
} from "rxjs";
import {AppService} from "../../../core/services/app.service";
import {NotificationService} from "../../../core/services/notification.service";
import {DeckPageService} from "../../deck/services/deck-page.service";

@Injectable()
export class PokemonService {
  private pokemon = new BehaviorSubject<DomainPokemon>({} as DomainPokemon);
  pokemon$ = this.pokemon.asObservable();

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private notificationService: NotificationService,
    private deckService: DeckPageService,
  ) {
  };

  getPokemon(name: string) {
    this.appService.setAppStatus("loading");
    this.http
      .get<Pokemon>(`${environment.baseURL}/pokemon/${name}`)
      .pipe(
        catchError(this.handleRequestError.bind(this)),
        map((response): DomainPokemon => ({...response, isAddedToDeck: false})),
        switchMap((domainPokemon): Observable<DomainPokemon> => {
          return combineLatest([of(domainPokemon), this.deckService.deck$]).pipe(
            map(([pokemon, deck]) => {
              pokemon.isAddedToDeck = deck.findIndex(el => el.id === pokemon.id) > -1;
              return pokemon;
            }),
          );
        }),
        tap(() => this.appService.setAppStatus("idle")),
      )
      .subscribe(data => this.pokemon.next(data));
  };

  addToDeck() {
    this.deckService.addToDeck(this.pokemon.getValue());
  };

  private handleRequestError(error: HttpErrorResponse) {
    const message = `${error.status}: ${error.statusText}`;
    this.notificationService.setNotification({message, type: "error"});
    this.appService.setAppStatus("error");
    return EMPTY;
  };
}
