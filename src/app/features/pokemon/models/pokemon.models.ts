export interface Type {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface Ability {
  slot: number
  ability: {
    name: string
    url: string
  }
}

export interface Pokemon {
  id: number
  name: string
  types: Type[]
  abilities: Ability[]
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
}
