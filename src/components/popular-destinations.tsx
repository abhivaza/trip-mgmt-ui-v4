"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TripCard } from "@/components/trip-card";
import { ItineraryResponse } from "@/types/itinerary";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { useApi } from "@/providers/api-provider";

export const PopularDestinations = () => {
  const router = useRouter();
  const [trips, setTrips] = useState<ItineraryResponse[]>([]);

  const { toast } = useToast();
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    async function fetchTrips() {
      try {
        const tripsData = await api.get<ItineraryResponse[]>("/public/trips");
        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trips:", error);
        toast({
          title: "Error",
          description: "Failed to fetch trips. Please try again.",
          variant: "destructive",
        });
      } finally {
      }
    }

    fetchTrips();
  }, [api, router, toast, user]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Popular Destinations</h3>
        <div className="flex space-x-2">
          <Button onClick={scrollPrev} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={scrollNext} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 first:pl-0"
            >
              <TripCard key={trip.id} trip={trip} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
