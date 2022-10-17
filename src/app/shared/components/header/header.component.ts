import {Component, OnInit} from "@angular/core";
import {DeckPageService} from "../../../features/deck/services/deck-page.service";
import {Observable} from "rxjs";
import {Pokemon} from "../../../features/pokemon/models/pokemon.models";

@Component({
  selector: "pd-header",
  templateUrl: "./header.component.html",
  styleUrls: [
    "../../../app.component.css",
    "./header.component.css",
  ],
})
export class HeaderComponent implements OnInit {
  deck$!: Observable<Pokemon[]>;

  constructor(private deckService: DeckPageService) {
  };

  ngOnInit() {
    this.deck$ = this.deckService.deck$;
  };
}
