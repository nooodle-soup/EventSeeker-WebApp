export interface Favorite {
  name: string;
  date: string;
  category: string;
  venue: string;
}

export interface StoredFavorties {
  [id: string]: Favorite;
}
