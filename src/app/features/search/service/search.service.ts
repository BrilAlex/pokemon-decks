import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Pokemon} from "../../pokemon/models/pokemon.models";
import {catchError, map, Observable, of} from "rxjs";
import {SearchResultsData} from "../models/search.models";

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {
  };

  getSearchResults(searchQuarry: string): Observable<SearchResultsData | null> {
    if (searchQuarry.trim() === "") return new Observable<null>();

    return this.http
      .get<Pokemon>(`${environment.baseURL}/pokemon/${searchQuarry}`)
      .pipe(
        map(response => {
          const id = response.id;
          const name = response.name;
          const results = [{id, name, imageUrl: `${environment.baseImageURL}/${response.id}.png`}];
          return {items: results, totalItems: results.length};
        }),
        catchError(() => {
          return of({
            items: [],
            totalItems: 0,
          });
        }),
      );
  };
}
