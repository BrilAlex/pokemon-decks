import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Pokemon} from "../../pokemon/models/pokemon.models";

@Injectable({
  providedIn: "root",
})
export class DeckPageService {
  private deck = new BehaviorSubject<Pokemon[]>([]);
  deck$ = this.deck.asObservable();

  addToDeck(pokemon: Pokemon) {
    this.deck.next([pokemon, ...this.deck.getValue()]);
  };

  removeFormDeck(pokemonId: number) {
    this.deck.next(this.deck.getValue().filter(p => p.id !== pokemonId));
  }
}
