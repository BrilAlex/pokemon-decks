import {Component, OnDestroy, OnInit} from "@angular/core";
import {debounceTime, distinctUntilChanged, Observable, of, Subscription, switchMap} from "rxjs";
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
export class SearchComponent implements OnInit, OnDestroy {

  searchSubscription!: Subscription;
  results!: SearchResultsData | null;
  searchQuery = new FormControl();

  constructor(private searchService: SearchService) {
  };

  ngOnInit() {
    this.searchSubscription = this.searchQuery.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap((searchQuery: string): Observable<SearchResultsData | null> => {
        if (searchQuery.trim() === "") {
          return of(null);
        }
        return this.searchService.getSearchResults(searchQuery);
      }),
    ).subscribe(results => {
      this.results = results
    });
  };

  clearSearchResults() {
    this.searchQuery.setValue("");
    this.results = null;
  };

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  };
}
