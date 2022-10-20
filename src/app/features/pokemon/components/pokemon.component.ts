import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {combineLatest, map, Observable} from "rxjs";
import {Pokemon} from "../models/pokemon.models";
import {AppService} from "../../../core/services/app.service";
import {RequestStatus} from "../../../core/models/app.models";
import {Location} from "@angular/common";
import {DeckPageService} from "../../deck/services/deck-page.service";

@Component({
  selector: "pd-pokemon",
  templateUrl: "./pokemon.component.html",
  styleUrls: [
    "../../../app.component.css",
    "./pokemon.component.css",
  ],
})
export class PokemonComponent implements OnInit {
  nameParam = "";
  appStatus$!: Observable<RequestStatus>;
  pokemon$!: Observable<Pokemon>;
  isAddedToDeck = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private appService: AppService,
    private location: Location,
    private deckService: DeckPageService,
  ) {
  };

  ngOnInit() {
    this.nameParam = this.route.snapshot.paramMap.get("nameParam")!;
    this.appStatus$ = this.appService.appStatus$;
    this.pokemonService.getPokemon(this.nameParam);
    this.pokemon$ = combineLatest([this.pokemonService.pokemon$, this.deckService.deck$]).pipe(
      map(([pokemon, deck]) => {
        this.isAddedToDeck = !!deck.find(({id}) => id === pokemon.id);
        return pokemon;
      }),
    );
  };

  goBack() {
    this.location.back();
  };

  addToDeck() {
    this.pokemonService.addToDeck();
  };
}
