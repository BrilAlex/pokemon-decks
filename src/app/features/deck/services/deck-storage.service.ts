import {Injectable} from "@angular/core";
import {Pokemon} from "../../pokemon/models/pokemon.models";
import {StorageService} from "../../../core/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class DeckStorageService {
  constructor(private storageService: StorageService) {
  };

  getDeckDataFromStorage(): Pokemon[] {
    const deckData = this.storageService.getItem("pokemon-deck");
    return JSON.parse(deckData || "[]");
  };

  setDeckDataInStorage(data: Pokemon[]): void {
    this.storageService.setItem("pokemon-deck", JSON.stringify(data));
  };

  clearDeckDataInStorage(): void {
    this.storageService.removeItem("pokemon-deck");
  };
}
