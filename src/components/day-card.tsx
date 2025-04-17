"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/providers/api-provider";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TripSections } from "@/components/trip-sections";

import type {
  ItineraryDayActivity,
  ItineraryResponse,
  ThingsToDo,
} from "@/types/itinerary";
import { EditActivityDialog } from "./edit-activity-dialog";

interface DayCardProps {
  day: ItineraryDayActivity;
  tripId: string;
  itinerary: ItineraryResponse | undefined;
  setItinerary: (itinerary: ItineraryResponse) => void;
}

export const DayCard = ({
  day,
  tripId,
  itinerary,
  setItinerary,
}: DayCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [thingsToDo, setThingsToDo] = useState<ThingsToDo[]>(
    day.thingsToDo || []
  );
  const [editingSection, setEditingSection] =
    useState<ItineraryDayActivity | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const api = useApi();
  const { toast } = useToast();

  useEffect(() => {
    setThingsToDo(day.thingsToDo || []);
  }, [day.thingsToDo]);

  const handleEditActivity = (activity: ItineraryDayActivity) => {
    setEditingSection(activity);
    setEditName(activity.title);
    setEditContent(activity.description);
    setIsEditing(true);
  };

  const saveEditedContent = async () => {
    if (!editingSection) return;

    try {
      // Create updated day
      const updatedDay = {
        ...day,
        title: editName,
        description: editContent,
        thingsToDo: thingsToDo,
      };

      // Create a copy of the current itinerary
      const updatedItinerary = { ...itinerary };

      // Update the itinerary with the edited day
      if (updatedItinerary && updatedItinerary.itinerary) {
        updatedItinerary.itinerary = updatedItinerary.itinerary.map((d) =>
          d.dayNumber === day.dayNumber ? updatedDay : d
        );

        // Update local state
        setItinerary(updatedItinerary);

        // Call API to update the itinerary
        await api.put(`/app/trip/${tripId}`, updatedItinerary);

        setIsEditing(false);
        toast({
          title: "Success",
          description: "Activities updated successfully",
        });
      }
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
      const response = await api.post<{ place: string }, ItineraryDayActivity>(
        `/app/trip/${tripId}/day/generate`,
        {
          place: day.place,
        }
      );

      if (response) {
        // Update the edit content
        setEditContent(response.description || "");

        // Update local itinerary state
        const updatedItinerary = { ...itinerary };
        if (updatedItinerary && updatedItinerary.itinerary) {
          updatedItinerary.itinerary = updatedItinerary.itinerary.map((d) => {
            if (d.dayNumber === day.dayNumber) {
              return {
                ...d,
                description: response.description || d.description,
              };
            }
            return d;
          });

          // Set the updated itinerary
          setItinerary(updatedItinerary);

          // Call API to update the itinerary
          await api.put(`/app/trip/${tripId}`, updatedItinerary);

          toast({
            title: "Success",
            description: "Itinerary content updated successfully",
          });
        }
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
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-2">
              <h3 className="font-semibold">Activities:</h3>
            </div>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{day.description}</ReactMarkdown>
            </div>
            <div className="mt-2">
              <Button
                variant="link"
                onClick={() => handleEditActivity(day)}
                className="p-0 h-auto mt-1"
              >
                <Edit className="h-4 w-4" />
                Edit Itinerary
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <TripSections
              tripId={tripId}
              place={day.place}
              thingsToDo={day.thingsToDo || []}
              setThingsToDo={setThingsToDo}
            />
          </div>
        </div>
      </CardContent>

      <EditActivityDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title={editingSection?.title || ""}
        editName={editName}
        setEditName={setEditName}
        editContent={editContent}
        setEditContent={setEditContent}
        onSave={saveEditedContent}
        onGenerateAI={generateAIContent}
        isGenerating={isGenerating}
      />
    </Card>
  );
};
