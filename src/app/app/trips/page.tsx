"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useApi } from "@/providers/api-provider";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { ChatbotSection } from "@/components/chatbot";
import type { ItineraryResponse } from "@/types/itinerary";
import LoadingSpinner from "@/components/loading-spinner";
import { TripCard } from "@/components/trip-card";
import { TRY_AGAIN_TEXT } from "@/lib/app-utils";

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
          description: "Failed to fetch trips." + " " + TRY_AGAIN_TEXT,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrips();
  }, [api, router, toast, user]);

  const handleEditTrip = (tripId: string) => {
    // Implement edit functionality
    console.log(`Editing trip ${tripId}`);
  };

  const handleDeleteTrip = (tripId: string) => {
    // Implement delete functionality
    console.log(`Deleting trip ${tripId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Trips</h1>
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8`}>
        <div className={`w-full ${!isMobile && "pr-8"}`}>
          {trips.length === 0 ? (
            <div className="text-center">
              <p className="mb-4">You haven&apos;t created any trips yet.</p>
              <Button onClick={() => router.push("/")}>Plan a New Trip</Button>
            </div>
          ) : (
            <div
              className={
                isMobile
                  ? "flex flex-col gap-6"
                  : "grid grid-cols-1 md:grid-cols-2 gap-8"
              }
            >
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onEdit={handleEditTrip}
                  onDelete={handleDeleteTrip}
                />
              ))}
            </div>
          )}
        </div>
        <div className={`${isMobile ? "mt-8" : "w-2/5 min-w-[300px]"}`}>
          <ChatbotSection chatInitType="general" />
        </div>
      </div>
    </div>
  );
}
