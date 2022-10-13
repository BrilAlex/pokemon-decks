import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {SearchService} from "../service/search.service";
import {SearchResultsData} from "../models/search.models";

@Component({
  selector: "pd-search",
  templateUrl: "./search.component.html",
  styleUrls: [
    "./search.component.css",
  ],
})
export class SearchComponent {
  value: string = "";
  results$!: Observable<SearchResultsData | null>;

  constructor(private searchService: SearchService) {
  };

  search() {
    this.results$ = this.searchService.getSearchResults(this.value);
  };

  hideResults() {
    this.value = "";
    this.results$ = this.searchService.getSearchResults("");
  };
}
