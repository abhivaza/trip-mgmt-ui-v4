"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useApi } from "@/providers/api-provider";
import { useToast } from "@/hooks/use-toast";
import { ItineraryResponse, TimeOfDay } from "@/types/itinerary";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChatbotSection } from "@/components/chatbot";

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
          `/trip/${trip_id}`
        );

        if (itineraryData?.itinerary?.length == 0) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Trip to {itinerary?.city}, {itinerary?.country}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          {isMobile && (
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              className="mySwiper mb-6"
            >
              {itinerary?.itinerary.map((day) => (
                <SwiperSlide key={day.day}>
                  <Card className="w-full h-full">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>
                          Day {day.day}: {day.title}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </span>
                      </CardTitle>
                      <CardDescription>{day.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold mb-2">Activities:</h3>
                      <div className="space-y-4">
                        {["morning", "afternoon", "evening"].map(
                          (timeOfDay) => (
                            <div key={timeOfDay}>
                              <h4 className="font-medium capitalize mb-2">
                                {timeOfDay}
                              </h4>
                              <ul className="list-disc list-inside space-y-1">
                                {day.activities[timeOfDay as TimeOfDay].map(
                                  (activity, index) => (
                                    <li key={index}>{activity}</li>
                                  )
                                )}
                              </ul>
                              {timeOfDay !== "evening" && (
                                <Separator className="my-2" />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="space-y-6">
              {itinerary?.itinerary.map((day) => (
                <Card key={day.day} className="w-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>
                        Day {day.day}: {day.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </span>
                    </CardTitle>
                    <CardDescription>{day.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">Activities:</h3>
                    <div className="space-y-4">
                      {["morning", "afternoon", "evening"].map((timeOfDay) => (
                        <div key={timeOfDay}>
                          <h4 className="font-medium capitalize mb-2">
                            {timeOfDay}
                          </h4>
                          <ul className="list-disc list-inside space-y-1">
                            {day.activities[timeOfDay as TimeOfDay].map(
                              (activity, index) => (
                                <li key={index}>{activity}</li>
                              )
                            )}
                          </ul>
                          {timeOfDay !== "evening" && (
                            <Separator className="my-2" />
                          )}
                        </div>
                      ))}
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="w-full md:w-1/3">
          <ChatbotSection />
        </div>
      </div>
    </div>
  );
}
