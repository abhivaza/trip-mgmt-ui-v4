"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  MessageCircle,
  Map,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

import { useAuth } from "@/providers/auth-provider";
import { ItineraryResponse } from "@/types/itinerary";
import { useApi } from "@/providers/api-provider";
import { TripCard } from "@/components/trip-card";

export default function Home() {
  const [destination, setDestination] = useState("");
  const router = useRouter();
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

  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState<ItineraryResponse[]>([]);

  const { toast } = useToast();
  const { user } = useAuth();
  const api = useApi();

  const handleGenerateItinerary = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to generate an itinerary.",
        variant: "destructive",
      });
      return;
    }
    if (!destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination for your trip.",
        variant: "destructive",
      });
      return;
    }

    async function fetchData() {
      let itineraryData = null;
      try {
        setIsLoading(true);
        itineraryData = await api.post<
          { destination: string },
          ItineraryResponse
        >("/app/trip/generate", {
          destination: destination,
        });

        if (
          itineraryData?.itinerary?.length == 0 ||
          itineraryData.message != "SUCCESS"
        ) {
          toast({
            title: "Error",
            description: "Invalid destination. Please try again.",
            variant: "destructive",
          });
        } else {
          router.push(`/app/trip/${itineraryData?.id}`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to generate itinerary. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  };

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

  return (
    <main className="flex-grow p-4 md:p-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Plan travel with AI
      </h2>
      <p className="text-xl mb-8 text-center">
        Making memories, without the planning headaches.
      </p>

      <div className="max-w-xl mx-auto mb-12">
        <div className="flex items-center bg-white rounded-lg shadow-md">
          <Input
            type="text"
            placeholder="5 days tour of New York city."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-grow border-none focus:ring-0"
          />

          <Button
            onClick={handleGenerateItinerary}
            disabled={isLoading}
            className="ml-2"
          >
            {isLoading ? "Generating..." : "Let's go"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>

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
      <section className="mb-20">
        <h3 className="text-3xl font-bold text-center mb-4">
          Get an itinerary, instantly.
        </h3>
        <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
          Must-visit destinations and dream experiences, all based on your own
          preferences. All that, taking into account hotels and travel.
        </p>
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
                <Zap className="h-6 w-6" />
              </div>
              <span className="font-semibold">Itinerary</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
                <MessageCircle className="h-6 w-6" />
              </div>
              <span className="font-semibold">AI Chat</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
                <Map className="h-6 w-6" />
              </div>
              <span className="font-semibold">On the go</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="p-3 bg-gray-100 border-b flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-gray-500">TripMinder</div>
            <div className="w-4"></div>
          </div>
          <Image
            src="/images/site-promo.png?height=600&width=800"
            alt="TripMinder App Interface"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}
