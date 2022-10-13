export interface SearchResult {
  id: number
  name: string
  imageUrl: string
}

export interface SearchResultsData {
  items: SearchResult[]
  totalItems: number
}
