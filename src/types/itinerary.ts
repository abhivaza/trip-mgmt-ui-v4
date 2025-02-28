export interface ItineraryResponse {
  id: string;
  message: string;
  city: string;
  country: string;
  popularityRank: number;
  tags: string[];
  itinerary: ItineraryDayActivity[];
  createdBy: string;
  fromDate: string;
  tripDuration: number;
  imageURL: string;
}

export interface ItineraryDayActivity {
  activities: string[];
  dayNumber: number;
  date: string;
  title: string;
  description: string;
}
