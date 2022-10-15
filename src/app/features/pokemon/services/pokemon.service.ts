import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Pokemon} from "../models/pokemon.models";
import {BehaviorSubject, catchError, EMPTY, tap} from "rxjs";
import {AppService} from "../../../core/services/app.service";
import {NotificationService} from "../../../core/services/notification.service";

@Injectable()
export class PokemonService {
  private pokemon = new BehaviorSubject<Pokemon>({} as Pokemon);
  pokemon$ = this.pokemon.asObservable();

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private notificationService: NotificationService,
  ) {
  };

  getPokemon(name: string) {
    this.appService.setAppStatus("loading");
    this.http
      .get<Pokemon>(`${environment.baseURL}/pokemon/${name}`)
      .pipe(
        catchError(this.handleRequestError.bind(this)),
        tap(() => this.appService.setAppStatus("idle")),
      )
      .subscribe(data => this.pokemon.next(data));
  };

  private handleRequestError(error: HttpErrorResponse) {
    const message = `${error.status}: ${error.statusText}`;
    this.notificationService.setNotification({message, type: "error"});
    this.appService.setAppStatus("error");
    return EMPTY;
  };
}
