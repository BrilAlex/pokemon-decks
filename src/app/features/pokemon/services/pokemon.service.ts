import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Pokemon} from "../models/pokemon.models";

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {};

  getPokemon(name: string) {
    return this.http.get<Pokemon>(`${environment.baseURL}/pokemon/${name}`);
  };
}
