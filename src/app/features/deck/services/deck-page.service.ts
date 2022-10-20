import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Pokemon} from "../../pokemon/models/pokemon.models";
import {DeckStorageService} from "./deck-storage.service";

@Injectable({
  providedIn: "root",
})
export class DeckPageService {
  private initData: Pokemon[] = this.deckStorageService.getDeckDataFromStorage();

  private deck = new BehaviorSubject<Pokemon[]>(this.initData);
  deck$ = this.deck.asObservable();

  constructor(private deckStorageService: DeckStorageService) {
  };

  addToDeck(pokemon: Pokemon) {
    const updatedDeck = [pokemon, ...this.deck.getValue()];
    this.deckStorageService.setDeckDataInStorage(updatedDeck);
    this.deck.next(updatedDeck);
  };

  removeFormDeck(pokemonId: number) {
    const updatedDeck = this.deck.getValue().filter(p => p.id !== pokemonId);
    this.deckStorageService.setDeckDataInStorage(updatedDeck);
    this.deck.next(updatedDeck);
  };

  clearDeck() {
    this.deckStorageService.clearDeckDataInStorage();
    this.deck.next([]);
  };
}
