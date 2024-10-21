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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// This would typically come from your API or database
const itineraryData = [
  {
    day: 1,
    title: "Arrival and City Exploration",
    description:
      "Welcome to your destination! After checking into your hotel, start with a leisurely walk through the city center to get oriented.",
    activities: {
      morning: [
        "Arrive at the airport",
        "Transfer to Hotel Le Grand",
        "Check-in and freshen up",
      ],
      afternoon: [
        "Lunch at hotel restaurant",
        "Guided walking tour of the city center",
        "Visit the Central Square",
      ],
      evening: [
        "Free time for shopping or relaxation",
        "Welcome dinner at local restaurant 'La Bonne Cuisine'",
      ],
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    day: 2,
    title: "Historical Tour",
    description:
      "Dive into the rich history of the region with guided tours of key historical sites.",
    activities: {
      morning: [
        "Breakfast at the hotel",
        "Guided tour of the Ancient Castle",
        "Visit the Castle Gardens",
      ],
      afternoon: [
        "Lunch at a medieval-themed restaurant",
        "Visit the National Museum",
        "Explore the Old Town district",
      ],
      evening: [
        "Evening river cruise with dinner",
        "Night walk along the illuminated riverfront",
      ],
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    day: 3,
    title: "Nature and Relaxation",
    description: "Escape the city for a day of natural beauty and relaxation.",
    activities: {
      morning: [
        "Early breakfast at the hotel",
        "Depart for nearby National Park",
        "Guided nature walk",
      ],
      afternoon: [
        "Picnic lunch by the lake",
        "Optional activities: kayaking or bird watching",
        "Return to the city",
      ],
      evening: [
        "Afternoon spa treatment at the hotel",
        "Farewell dinner at a Michelin-starred restaurant",
      ],
    },
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function ItineraryPage() {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Itinerary</h1>
      {/* <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={isMobile ? 1 : "auto"}
        pagination={{ clickable: true }}
        navigation={!isMobile}
        className="mySwiper block md:hidden"
      >
        {itineraryData.map((day) => (
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
              <CardContent className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                  <h3 className="font-semibold mb-2">Activities:</h3>
                  <div className="space-y-4">
                    {["morning", "afternoon", "evening"].map((timeOfDay) => (
                      <div key={timeOfDay}>
                        <h4 className="font-medium capitalize mb-2">
                          {timeOfDay}
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {day.activities[timeOfDay].map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                        {timeOfDay !== "evening" && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <Image
                    src={day.image}
                    alt={`Day ${day.day} highlight`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="space-y-6">
          {itineraryData.map((day) => (
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
              <CardContent className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                  <h3 className="font-semibold mb-2">Activities:</h3>
                  <div className="space-y-4">
                    {["morning", "afternoon", "evening"].map((timeOfDay) => (
                      <div key={timeOfDay}>
                        <h4 className="font-medium capitalize mb-2">
                          {timeOfDay}
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {day.activities[timeOfDay].map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                        {timeOfDay !== "evening" && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <Image
                    src={day.image}
                    alt={`Day ${day.day} highlight`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
