import {Component, OnDestroy, OnInit} from "@angular/core";
import {PokemonListService} from "../services/pokemon-list.service";
import {PokemonListData} from "../models/pokemon-list.models";
import {Observable, Subscription} from "rxjs";
import {AppService} from "../../../core/services/app.service";
import {RequestStatus} from "../../../core/models/app.models";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: "pd-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: [
    "./pokemon-list.component.css",
    "../../../app.component.css",
  ],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  appStatus$!: Observable<RequestStatus>;
  pokemonListData$!: Observable<PokemonListData>;
  queryParamsSubscription!: Subscription;

  constructor(
    private pokemonListService: PokemonListService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  };

  ngOnInit(): void {
    this.appStatus$ = this.appService.appStatus$;
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      const limit = Number(params["limit"]) ? Number(params["limit"]) : 20;
      const offset = Number(params["offset"]) ? Number(params["offset"]) : 0;
      this.getPokemonList({limit, offset});
    });
  };

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  };

  getPokemonList(params: {limit: number, offset: number}) {
    this.pokemonListService.getPokemonListData(params);
    this.pokemonListData$ = this.pokemonListService.pokemonListData$;
  };

  changePage(data: { limit: number, offset: number }) {
    this.router
      .navigate(["/"], {
        queryParams: {
          offset: data.offset,
          limit: data.limit,
        }
      });
  };
}
