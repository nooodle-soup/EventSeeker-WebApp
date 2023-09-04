import { Component, OnInit } from '@angular/core';
import { Event, EventDetails } from '../../interfaces/event.interface';
import { SearchForm } from '../../interfaces/searchform.interface';
import { VenueDetails } from 'src/app/interfaces/venue.interface';
import axios from 'axios';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  events: Event[] = [];
  event?: Event;
  eventDetails: EventDetails = {
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
  venueDetails: VenueDetails = {
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
  displayEventList: boolean = false;
  noEventsToDisplay: boolean = false;
  displayEventDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  async onSearchFormSubmitted(formData: SearchForm) {
    const ipinfoToken = '57f03ae591b020';
    console.log(formData);

    if (formData['autoDetect'] == true) {
      const url = `https://ipinfo.io/json?token=${ipinfoToken}`;
      const response = await axios.get(url);
      console.log(response.data);
      formData.latlong = response.data.loc;
    }

    delete formData['autoDetect'];

    // make call to backend with event values
    try {
      const response = await axios.get('https://eventspotter--nooodle-soup.uc.r.appspot.com/v1/getEventList', {
        params: formData
      });
      console.log(response.data.events);
      if (response.data.events) {
        this.events = response.data.events;
      } else {
        this.noEventsToDisplay = true;
      }

    } catch (error) {
      console.error(error);
    }

    this.displayEventList = true;
  }

  async onEventDetailsRequested(event: Event) {
    console.log(event);

    this.event = event;
    try {
      let res2: any;
      let res1: any;
      if (event['id']) {
        res1 = await axios.get(`https://eventspotter--nooodle-soup.uc.r.appspot.com/v1/getEventDetails/`, {
          params: { eventId: event.id }
        });
      }
      if (event.venue) {
        res2 = await axios.get(`https://eventspotter--nooodle-soup.uc.r.appspot.com/v1/getVenueDetails/`, {
          params: { venue: event.venue }
        });
      }
      console.log(res1);
      console.log(res2);

      this.eventDetails = res1.data.eventDetails;
      this.venueDetails = res1.data.venueDetails;

      // Once everything is done, display event details
      this.displayEventList = false;
      this.displayEventDetails = true;
      // Add Favorite code.
    } catch (err) {
      console.error(err);
    }
  }


  onShowEventList() {
    this.displayEventDetails = false;
    this.displayEventList = true;
  }

  onSearchFormCleared() {
    this.displayEventList = false;
    this.noEventsToDisplay = false;
    this.displayEventDetails = false;
  }
}
