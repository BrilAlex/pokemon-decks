import {Component, OnDestroy, OnInit} from "@angular/core";
import {PokemonListService} from "../services/pokemon-list.service";
import {PokemonListData} from "../models/pokemon-list.models";
import {finalize, Observable, Subject, Subscription, takeUntil} from "rxjs";
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
  destroySubject = new Subject<void>();

  constructor(
    private pokemonListService: PokemonListService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  };

  ngOnInit(): void {
    this.appStatus$ = this.appService.appStatus$;
    this.route.queryParams
      .pipe(
        finalize(() => console.log("unsubscribe")),
        takeUntil(this.destroySubject),
      )
      .subscribe((params: Params) => {
        const limit = Number(params["limit"]) ? Number(params["limit"]) : 20;
        const offset = Number(params["offset"]) ? Number(params["offset"]) : 0;
        this.getPokemonList({limit, offset});
      });
  };

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  };

  getPokemonList(params: { limit: number, offset: number }) {
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
