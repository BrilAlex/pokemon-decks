import {Injectable} from "@angular/core";
import {DomainPokemon} from "../../features/pokemon/models/pokemon.models";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  getDeckDataFromStorage() {
    const deckData = localStorage.getItem("pokemon-deck");
    return JSON.parse(deckData || "[]");
  };

  setDeckDataInStorage(data: DomainPokemon[]) {
    localStorage.setItem("pokemon-deck", JSON.stringify(data));
  };
}
