import {Pokemon} from "../../pokemon/models/pokemon.models";

export interface Result {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export interface PokemonListData {
  results: Pokemon[]
  offset: number
  limit: number
  totalCount: number
}
