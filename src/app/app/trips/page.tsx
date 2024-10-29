"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useApi } from "@/providers/api-provider";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { ChatbotSection } from "@/components/chatbot";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ItineraryResponse } from "@/types/itinerary";

export default function TripsPage() {
  const [trips, setTrips] = useState<ItineraryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const api = useApi();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    async function fetchTrips() {
      try {
        setIsLoading(true);
        const tripsData = await api.get<ItineraryResponse[]>("/app/trips");
        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trips:", error);
        toast({
          title: "Error",
          description: "Failed to fetch trips. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrips();
  }, [api, router, toast, user]);

  const handleViewTrip = (tripId: string) => {
    router.push(`/app/trip/${tripId}`);
  };

  const TripCard = ({ trip }: { trip: ItineraryResponse }) => (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {trip.city}, {trip.country}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="mr-2 h-4 w-4" />
          {trip.city}, {trip.country}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="mr-2 h-4 w-4" />
          {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </div>
        <Button onClick={() => handleViewTrip(trip.id)} className="w-full">
          View Trip <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return <div className="text-center mt-8">Loading your trips...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Trips</h1>
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6`}>
        <div className={`w-full ${!isMobile && "pr-6"}`}>
          {trips.length === 0 ? (
            <div className="text-center">
              <p className="mb-4">You haven&apos;t created any trips yet.</p>
              <Button onClick={() => router.push("/")}>Plan a New Trip</Button>
            </div>
          ) : isMobile ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="mySwiper mb-6"
              style={{ height: "400px" }}
            >
              {trips.map((trip) => (
                <SwiperSlide key={trip.id}>
                  <TripCard trip={trip} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
        <div className={`${isMobile ? "mt-6" : "w-2/5 min-w-[300px]"}`}>
          <ChatbotSection chatInitType="general" />
        </div>
      </div>
    </div>
  );
}
