export interface MovieResponse {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export interface SearchResponse {
    Search: MovieResponse[]
}