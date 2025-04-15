"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { useApi } from "@/providers/api-provider";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { ChatbotSection } from "@/components/chatbot";
import type {
  ItineraryDayActivity,
  ItineraryResponse,
} from "@/types/itinerary";
import { TRY_AGAIN_TEXT } from "@/lib/app-utils";
import { ShareTrip } from "@/components/share-trip";
import { TripSections } from "@/components/trip-sections";

const TripImage = ({
  imageURL,
  highlight,
}: {
  imageURL: string;
  highlight: string;
}) => {
  const params: { trip_id: string } = useParams();
  const { trip_id } = params;

  return (
    <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
      <Image
        src={imageURL || "/placeholder.svg"}
        alt={`${highlight}`}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-6">
        <h2 className="text-white text-3xl font-bold drop-shadow-lg">
          {highlight}
        </h2>
        <ShareTrip tripId={trip_id} className="absolute top-4 right-4" />
      </div>
    </div>
  );
};

export default function ItineraryPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse>();

  const params: { trip_id: string } = useParams();
  const { trip_id } = params;

  const api = useApi();
  const { toast } = useToast();

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
    async function fetchData() {
      try {
        const itineraryData = await api.get<ItineraryResponse>(
          `/app/trip/${trip_id}`
        );

        if (itineraryData?.itinerary?.length === 0) {
          toast({
            title: "Error",
            description: "Invalid destination." + " " + TRY_AGAIN_TEXT,
            variant: "destructive",
          });
          return;
        }

        setItinerary(itineraryData);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to generate itinerary." + " " + TRY_AGAIN_TEXT,
          variant: "destructive",
        });
      }
    }

    fetchData();
  }, [api, trip_id, toast]);

  const DayCard = ({ day }: { day: ItineraryDayActivity }) => (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            Day {day.dayNumber}: {day.title}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </span>
        </CardTitle>
        <CardDescription>{day.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Activities:</h3>
        <ul className="list-disc list-inside space-y-2">
          {day.activities.map((activity, index) => (
            <li key={index} className="leading-relaxed">
              {activity}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {itinerary && (
        <div className="mb-8">
          <TripImage
            imageURL={itinerary.imageURL}
            highlight={`Your Trip to ${itinerary?.city}, ${itinerary?.country}`}
          />
        </div>
      )}

      <div className="text-center mb-8">
        {itinerary?.popularityRank === 1 && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">
              #1 Most Popular Destination
            </span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 justify-center">
          {itinerary?.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6`}>
        <div className={`w-full`}>
          <div className="flex flex-col gap-6">
            {itinerary?.itinerary.map((day) => (
              <DayCard key={day.dayNumber} day={day} />
            ))}
          </div>
        </div>
        <div className={`${isMobile ? "w-full" : "w-4/5 min-w-[300px]"}`}>
          <TripSections tripId={trip_id} />
          <ChatbotSection chatInitType="trip-specific" />
        </div>
      </div>
    </div>
  );
}
