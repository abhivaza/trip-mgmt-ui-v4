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
  message: string;
  itinerary: Itinerary[];
}

export type TimeOfDay = "morning" | "afternoon" | "evening";
