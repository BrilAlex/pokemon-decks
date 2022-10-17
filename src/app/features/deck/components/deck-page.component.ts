import {Component, OnInit} from "@angular/core";
import {DeckPageService} from "../services/deck-page.service";
import {Observable} from "rxjs";
import {Pokemon} from "../../pokemon/models/pokemon.models";

@Component({
  selector: "pd-deck",
  templateUrl: "./deck-page.component.html",
  styleUrls: [
    "../../../app.component.css",
    "./deck-page.component.css",
  ],
})
export class DeckPageComponent implements OnInit {
  deck$!: Observable<Pokemon[]>;

  constructor(private deckService: DeckPageService) {
  };

  ngOnInit() {
    this.deck$ = this.deckService.deck$;
  };

  removeFromDeck(pokemonId: number) {
    this.deckService.removeFormDeck(pokemonId);
  };
}
