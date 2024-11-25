export interface ItineraryResponse {
  id: string;
  message: string;
  city: string;
  country: string;
  popularityRank: number;
  tags: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  createdBy: string;
  startDate: string;
  endDate: string;
  imageURL: string;
}
