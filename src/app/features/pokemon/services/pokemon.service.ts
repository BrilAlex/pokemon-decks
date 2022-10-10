import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Pokemon} from "../models/pokemon.models";
import {BehaviorSubject} from "rxjs";
import {AppService} from "../../../core/services/app.service";

@Injectable()
export class PokemonService {
  private pokemon = new BehaviorSubject<Pokemon>({} as Pokemon);
  pokemon$ = this.pokemon.asObservable();

  constructor(private http: HttpClient, private appService: AppService) {};

  getPokemon(name: string) {
    this.appService.setAppStatus("loading");
    this.http
      .get<Pokemon>(`${environment.baseURL}/pokemon/${name}`)
      .subscribe(data => {
        this.pokemon.next(data);
        this.appService.setAppStatus("idle");
      });
  };
}
