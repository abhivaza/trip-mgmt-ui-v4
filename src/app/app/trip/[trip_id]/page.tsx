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
import { MarkdownEditor } from "@/components/markdown-editor";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";

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

  const DayCard = ({ day }: { day: ItineraryDayActivity }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingSection, setEditingSection] =
      useState<ItineraryDayActivity | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [editContent, setEditContent] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const handleEditActivity = (activity: ItineraryDayActivity) => {
      setEditingSection(activity);
      setEditName(activity.title);
      setEditContent(activity.description);
      setIsEditing(true);
    };

    const saveEditedContent = async () => {
      if (!editingSection) return;

      try {
        await api.put(`/app/trip/${trip_id}/day/${day.dayNumber}`, {
          title: editName,
          activitiesMarkdown: editContent,
        });

        // Update local state
        const updatedDay = {
          ...day,
          title: editName,
          description: editContent,
        };

        // You might need to update the itinerary state here
        // This is a simplified approach
        setItinerary((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            itinerary: prev.itinerary.map((d) =>
              d.dayNumber === day.dayNumber ? updatedDay : d
            ),
          };
        });

        setIsEditing(false);
        toast({
          title: "Success",
          description: "Activities updated successfully",
        });
      } catch (error) {
        console.error("Error saving activities:", error);
        toast({
          title: "Error",
          description: "Failed to save activities",
          variant: "destructive",
        });
      }
    };

    const generateAIContent = async () => {
      setIsGenerating(true);
      try {
        // Implement your AI content generation logic here
        // For example:
        const response = await api.post(
          `/app/trip/${trip_id}/generate-activity`,
          {
            dayNumber: day.dayNumber,
            currentTitle: editName,
          }
        );

        if (response.content) {
          setEditContent(response.content);
        }
      } catch (error) {
        console.error("Error generating content:", error);
        toast({
          title: "Error",
          description: "Failed to generate content with AI",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    };

    return (
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
          <CardDescription>Place: {day.place}</CardDescription>
          <CardDescription>{day.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Activities:</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditActivity(day)}
              className="flex items-center gap-1"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{day.description}</ReactMarkdown>
          </div>
        </CardContent>

        <Dialog
          open={isEditing}
          onOpenChange={(open) => !open && setIsEditing(false)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSection?.title} - Edit Activity</DialogTitle>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="activity-name" className="text-sm font-medium">
                  Activity Name
                </label>
                <input
                  id="activity-name"
                  className="w-full p-2 border rounded-md"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Activity Description
                </label>
                <MarkdownEditor value={editContent} onChange={setEditContent} />
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <Button
                variant="outline"
                onClick={generateAIContent}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={saveEditedContent}>Save Changes</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    );
  };

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
