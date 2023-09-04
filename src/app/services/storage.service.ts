import { Injectable } from '@angular/core';
import { Favorite, StoredFavorties } from '../interfaces/favorites.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  favoriteEvents: StoredFavorties = {};

  constructor() {
    this.loadFavorites();
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favoriteEvents');
    if (storedFavorites) {
      this.favoriteEvents = JSON.parse(storedFavorites);
    }
  }

  addToFavorites(eventId: string, favorite: Favorite) {
    this.favoriteEvents[eventId] = favorite;
    this.saveFavoritesToLocalStorage();
  }

  removeFromFavorites(eventId: string) {
    delete this.favoriteEvents[eventId];
    this.saveFavoritesToLocalStorage();
  }

  private saveFavoritesToLocalStorage() {
    localStorage.setItem('favoriteEvents', JSON.stringify(this.favoriteEvents));
  }

}
