import {Injectable} from "@angular/core";
import {Pokemon} from "../../features/pokemon/models/pokemon.models";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  getDeckDataFromStorage() {
    const deckData = localStorage.getItem("pokemon-deck");
    return JSON.parse(deckData || "[]");
  };

  setDeckDataInStorage(data: Pokemon[]) {
    localStorage.setItem("pokemon-deck", JSON.stringify(data));
  };
}
