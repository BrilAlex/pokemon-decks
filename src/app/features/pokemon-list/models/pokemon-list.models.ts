export interface PokemonListItem {
  id: number
  name: string
  url: string
  imageUrl: string
}

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
