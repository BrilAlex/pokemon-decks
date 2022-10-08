import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {PokemonListItem, PokemonListResponse, Result} from "../models/pokemon-list.models";
import {environment} from "../../../../environments/environment";

@Injectable()
export class PokemonListService {

  constructor(private http: HttpClient) {};

  getPokemonList(offset: number = 0) {
    return this.http
      .get<PokemonListResponse>(`${environment.baseURL}/pokemon`, {params: {limit: 20, offset}})
      .pipe(
        map((response): Result[] => response.results),
        map((results): PokemonListItem[] => {
          return results.map((pokemon, i) => {
            const id = i + offset + 1;
            const imageUrl = `${environment.baseImageURL}/${id}.png`;
            return {...pokemon, id, imageUrl};
          });
        }),
      );
  };
}
