type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

type MovieResult = {
  Search: Search[];
  totalResults: string;
  Response: string;
  Error: string;
}
