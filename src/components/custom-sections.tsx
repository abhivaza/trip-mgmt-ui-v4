"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  X,
  MountainIcon as Hiking,
  Utensils,
  TrendingUp,
  MapPin,
  Camera,
  Car,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type SectionType = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
};

const SECTION_TEMPLATES = [
  {
    id: "hiking",
    title: "Hiking Plan",
    icon: <Hiking className="h-5 w-5" />,
    content:
      "Add details about hiking trails, difficulty levels, and required gear.",
  },
  {
    id: "dining",
    title: "Dining Plan",
    icon: <Utensils className="h-5 w-5" />,
    content:
      "List restaurants to visit, local cuisines to try, and reservation details.",
  },
  {
    id: "trending",
    title: "Trending Reels",
    icon: <TrendingUp className="h-5 w-5" />,
    content:
      "Popular spots for photos and videos, trending locations from social media.",
  },
  {
    id: "landmarks",
    title: "Must-See Landmarks",
    icon: <MapPin className="h-5 w-5" />,
    content: "Important landmarks and attractions you don't want to miss.",
  },
  {
    id: "photography",
    title: "Photography Spots",
    icon: <Camera className="h-5 w-5" />,
    content: "Best locations and times for taking memorable photos.",
  },
  {
    id: "transport",
    title: "Transportation",
    icon: <Car className="h-5 w-5" />,
    content:
      "Local transportation options, rental information, and navigation tips.",
  },
];

interface CustomSectionsProps {
  tripId: string;
}

export function CustomSections({ tripId }: CustomSectionsProps) {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [open, setOpen] = useState(false);

  const addSection = (template: (typeof SECTION_TEMPLATES)[0]) => {
    setSections([
      ...sections,
      {
        ...template,
        id: `${template.id}-${Date.now()}`, // Ensure unique ID
      },
    ]);
    setOpen(false);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>What would you do?</span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add section</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Section</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {SECTION_TEMPLATES.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent"
                    onClick={() => addSection(template)}
                  >
                    {template.icon}
                    <span>{template.title}</span>
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sections.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>Add custom sections to enhance your trip planning</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="border rounded-md p-4 relative"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => removeSection(section.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <div className="flex items-center gap-2 mb-2">
                    {section.icon}
                    <h3 className="font-medium">{section.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {section.content}
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                    Edit details
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
