export interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

export interface ApiResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}
