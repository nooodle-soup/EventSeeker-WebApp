import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Event } from '../../interfaces/event.interface'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  @Input() events: Event[] = [];
  @Output() eventDetailsRequested = new EventEmitter<Event>();

  emitShowEventDetails(event: Event) {
    this.eventDetailsRequested.emit(event);
  }
}
