import { Component } from '@angular/core';
import { StoredFavorties } from 'src/app/interfaces/favorites.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  get favoriteEvents(): StoredFavorties {
    return this.storageService.favoriteEvents;
  }

  favoriteEventsKeys(): string[] {
    return Object.keys(this.favoriteEvents);
  }

  constructor(private storageService: StorageService) { }

  removeFavorite(eventId: string) {
    this.storageService.removeFromFavorites(eventId);
  }

}
