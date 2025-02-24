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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChatbotSection } from "@/components/chatbot";
import "swiper/css";
import "swiper/css/pagination";
import { ItineraryDayActivity, ItineraryResponse } from "@/types/itinerary";

const TripImage = ({
  imageURL,
  highlight,
}: {
  imageURL: string;
  highlight: string;
}) => (
  <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
    <Image
      src={imageURL}
      alt={`${highlight}`}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-6">
      <h2 className="text-white text-3xl font-bold drop-shadow-lg">
        {highlight}
      </h2>
    </div>
  </div>
);

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
            description: "Invalid destination. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setItinerary(itineraryData);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to generate itinerary. Please try again.",
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
        <div className={`w-full ${!isMobile && "pr-6"}`}>
          {isMobile ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="mySwiper mb-6"
              style={{ height: "500px" }}
            >
              {itinerary?.itinerary.map((day) => (
                <SwiperSlide key={day.dayNumber}>
                  <DayCard day={day} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col gap-6">
              {itinerary?.itinerary.map((day) => (
                <DayCard key={day.dayNumber} day={day} />
              ))}
            </div>
          )}
        </div>
        <div className={`${isMobile ? "mt-6" : "w-2/5 min-w-[300px]"}`}>
          <ChatbotSection chatInitType="trip-specific" />
        </div>
      </div>
    </div>
  );
}
