"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { useApi } from "@/providers/api-provider";
import { ItineraryResponse } from "@/types/itinerary";

export const GenerateItinerary: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

    try {
      setIsLoading(true);
      const itineraryData = await api.post<
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
  };

  return (
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
  );
};
