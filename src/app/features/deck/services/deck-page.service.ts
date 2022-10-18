import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {DomainPokemon} from "../../pokemon/models/pokemon.models";
import {DataStorageService} from "../../../core/services/data-storage.service";

@Injectable({
  providedIn: "root",
})
export class DeckPageService {
  private initData = this.dataStorageService.getDeckDataFromStorage();

  private deck = new BehaviorSubject<DomainPokemon[]>(this.initData);
  deck$ = this.deck.asObservable();

  constructor(private dataStorageService: DataStorageService) {
  };

  addToDeck(pokemon: DomainPokemon) {
    const updatedDeck = [pokemon, ...this.deck.getValue()];
    this.dataStorageService.setDeckDataInStorage(updatedDeck);
    this.deck.next(updatedDeck);
  };

  removeFormDeck(pokemonId: number) {
    const updatedDeck = this.deck.getValue().filter(p => p.id !== pokemonId);
    this.dataStorageService.setDeckDataInStorage(updatedDeck);
    this.deck.next(updatedDeck);
  };

  clearDeck() {
    this.dataStorageService.setDeckDataInStorage([]);
    this.deck.next([]);
  };
}
