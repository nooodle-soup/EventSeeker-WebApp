import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event, EventDetails } from '../../interfaces/event.interface';
import { Favorite, StoredFavorties } from '../../interfaces/favorites.interface';
import { StorageService } from 'src/app/services/storage.service';
import { VenueDetails } from 'src/app/interfaces/venue.interface';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  @Input() eventDetails: EventDetails = {
    name: 'Event Name',
    date: 'Event Date',
    time: 'Event Time',
    artistNames: ['Artist 1', 'Artist 2'],
    venue: 'Event Venue',
    genres: 'Event Genre',
    priceRanges: [], // You can provide actual data here
    ticketStatus: 'Ticket Status',
    buyTicketUrl: 'Ticket URL',
    seatmapUrl: 'Seatmap URL',
    spotifyInfo: {}, // You can provide actual data here
    id: 'ID',
    icon: 'icon'
  };
  @Input() venueDetails: VenueDetails = {
    name: "Venue Name",
    addressLine1: "Address Line 1",
    cityName: "City Name",
    stateName: "State Name",
    boxOfficeOpenHours: "Open Hours",
    boxOfficePhoneNumber: "000-000-0000",
    generalRule: "Venue General Rules",
    childRule: "Venue Child Rule",
    location: "Venue location"
  };
  @Input() event?: Event;
  @Output() toggleFavorite = new EventEmitter<Event>();
  @Output() showEventList = new EventEmitter<any>();
  venueOpenHoursShowMore = false;
  venueGeneralRuleShowMore = false;
  venueChildRuleShowMore = false;

  get favoriteEvents(): StoredFavorties {
    return this.storageService.favoriteEvents;
  }

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  emitShowEventList() {
    this.showEventList.emit();
  }

  addToFavorites() {
    if (this.event) {
      const favorite: Favorite = {
        name: this.event.name,
        date: this.event.date,
        category: this.event.genre,
        venue: this.event.venue,
      };
      this.storageService.addToFavorites(this.event.id, favorite);
    }
  }

  removeFromFavorites() {
    if (this.event) {
      this.storageService.removeFromFavorites(this.event.id);
    }
  }

  showMoreOpenHours() {
    this.venueOpenHoursShowMore = !this.venueOpenHoursShowMore;
  }

  showMoreGeneralRule() {
    this.venueGeneralRuleShowMore = !this.venueGeneralRuleShowMore;
  }

  showMoreChildRule() {
    this.venueChildRuleShowMore = !this.venueChildRuleShowMore;
  }
}
