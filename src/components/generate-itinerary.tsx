"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { useApi } from "@/providers/api-provider";
import type { Itinerary } from "@/types/itinerary";
import { TRY_AGAIN_TEXT } from "@/lib/app-utils";
import { AI_TRIP_PROMPTS } from "@/constants/ai-trip-prompts";

export const GenerateItinerary: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState<number | null>(
    null
  );
  const tickerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const api = useApi();
  const [showPrompts, setShowPrompts] = useState([{ title: "", prompt: "" }]);

  useEffect(() => {
    setShowPrompts(AI_TRIP_PROMPTS.sort(() => 0.5 - Math.random()).slice(0, 5));
  }, []);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 0.5;

      if (position < -ticker.scrollWidth / 2) {
        position = 0;
      }

      ticker.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

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
      const itineraryData = await api.post<{ destination: string }, Itinerary>(
        "/app/trip/generate",
        {
          destination: destination,
        }
      );

      if (
        itineraryData?.itinerary?.length == 0 ||
        itineraryData.message != "SUCCESS"
      ) {
        toast({
          title: "Error",
          description: "Invalid destination." + " " + TRY_AGAIN_TEXT,
          variant: "destructive",
        });
      } else {
        router.push(`/app/trip/${itineraryData?.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary." + " " + TRY_AGAIN_TEXT,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (index: number) => {
    setActivePromptIndex(index);
    setDestination(showPrompts[index].prompt);
  };

  return (
    <div className="max-w-xl mx-auto mb-6">
      <div className="relative rounded-md">
        <textarea
          placeholder="5 days tour of New York city."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-0 focus:outline-none resize-none pr-24"
          rows={3}
        />

        <div className="mt-3 overflow-hidden bg-gray-50 rounded-lg p-2">
          <div className="text-[10px] text-gray-500 mb-1">
            Example prompts (click to use):
          </div>
          <div className="relative overflow-hidden text-xs">
            <div
              ref={tickerRef}
              className="flex whitespace-nowrap"
              style={{ willChange: "transform" }}
            >
              {[...showPrompts, ...showPrompts].map((prompt, index) => (
                <div
                  key={index}
                  onClick={() => handlePromptClick(index % showPrompts.length)}
                  className={`
                    inline-block px-3 py-1 mr-3 rounded-full cursor-pointer transition-colors
                    ${
                      activePromptIndex === index % showPrompts.length
                        ? `bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-md`
                        : `bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 hover:text-gray-800`
                    }
                  `}
                >
                  {prompt.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <Button
            onClick={handleGenerateItinerary}
            disabled={isLoading}
            size="sm"
          >
            {!isLoading && <Sparkles className="h-4 w-4 mr-1" />}
            {isLoading ? "Generating..." : "Let's go"}
          </Button>
        </div>
      </div>
    </div>
  );
};
