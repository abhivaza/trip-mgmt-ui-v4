export interface Itinerary {
  day: number; // The day number in the itinerary.
  title: string; // The title of the day's activities.
  description: string; // A brief description of the day's overall plan.
  activities: {
    morning: string[]; // Activities scheduled for the morning.
    afternoon: string[]; // Activities scheduled for the afternoon.
    evening: string[]; // Activities scheduled for the evening.
  };
}
export interface ItineraryResponse {
  tripId: string;
  message: string;
  city: string;
  country: string;
  popularityRank: number;
  tags: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: {
      morning: string[];
      afternoon: string[];
      evening: string[];
    };
  }>;
}

export type TimeOfDay = "morning" | "afternoon" | "evening";
