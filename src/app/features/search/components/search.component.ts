import {Component} from "@angular/core";
import {debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap} from "rxjs";
import {SearchService} from "../service/search.service";
import {SearchResultsData} from "../models/search.models";
import {FormControl} from "@angular/forms";

@Component({
  selector: "pd-search",
  templateUrl: "./search.component.html",
  styleUrls: [
    "./search.component.css",
  ],
})
export class SearchComponent {

  results$: Observable<SearchResultsData | null>;
  searchQuery = new FormControl();
  isVisible = true;

  constructor(private searchService: SearchService) {
    this.results$ = this.searchQuery.valueChanges.pipe(
      tap((searchQuery) => this.isVisible = !!searchQuery.trim()),
      debounceTime(1000),
      distinctUntilChanged(),
      map((searchQuery: string) => searchQuery.trim() === "" ? null : searchQuery),
      switchMap((searchQuery: string | null): Observable<SearchResultsData | null> => {
        return searchQuery ? this.searchService.getSearchResults(searchQuery) : of(null);
      }),
    );
  };

  clearSearchResults() {
    this.searchQuery.setValue("");
  };
}
