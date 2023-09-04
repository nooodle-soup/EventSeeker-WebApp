export interface Event {
  date: string;
  time: string;
  icon: string;
  name: string;
  genre: string;
  venue: string;
  id: string;
}

export interface EventDetails {
  name: string;
  date: string;
  time: string;
  artistNames: string[];
  venue: string;
  genres: string;
  priceRanges: any;
  ticketStatus: string;
  buyTicketUrl: string;
  seatmapUrl: string;
  spotifyInfo: any;
  id: string;
  icon: string;
}
