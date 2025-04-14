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
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownEditor } from "./markdown-editor";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

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

export function TripSections({ tripId }: CustomSectionsProps) {
  const [sections, setSections] = useState<SectionType[]>([]);
  const [open, setOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionType | null>(
    null
  );
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { toast } = useToast();

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

  const openEditDialog = (section: SectionType) => {
    setEditingSection(section);
    setEditContent(section.content);
    setIsEditing(true);
  };

  const saveEditedContent = () => {
    if (!editingSection) return;

    setSections(
      sections.map((section) =>
        section.id === editingSection.id
          ? { ...section, content: editContent }
          : section
      )
    );

    setIsEditing(false);
    setEditingSection(null);
  };

  const generateAIContent = async () => {
    if (!editingSection) return;

    setIsGenerating(true);

    try {
      // This would be replaced with your actual AI generation API call
      // For now, we'll simulate a delay and return some sample content
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const sectionType = editingSection.title.toLowerCase();
      let generatedContent = "";

      if (sectionType.includes("hiking")) {
        generatedContent = `## Recommended Hiking Trails

1. **Mountain Vista Trail** - Moderate difficulty, 5.2 miles
   - *Elevation gain:* 1,200 ft
   - *Estimated time:* 3-4 hours
   - *Highlights:* Panoramic views, wildlife sightings

2. **Waterfall Loop** - Easy difficulty, 2.8 miles
   - *Elevation gain:* 400 ft
   - *Estimated time:* 1.5-2 hours
   - *Highlights:* Three scenic waterfalls

### Required Gear
- Hiking boots with ankle support
- At least 2L of water per person
- Sun protection
- Trail map (available at visitor center)`;
      } else if (sectionType.includes("dining")) {
        generatedContent = `## Local Restaurants

### Must-Try Places
1. **The Rustic Table** - Farm-to-table cuisine
   - *Reservation recommended:* Yes
   - *Price range:* $$-$$$
   - *Specialty:* Seasonal harvest platter

2. **Ocean Blue** - Fresh seafood
   - *Reservation recommended:* Yes, especially weekends
   - *Price range:* $$$
   - *Specialty:* Grilled catch of the day

### Local Delicacies
- Don't miss trying the regional specialty stew
- Visit the farmers market on Saturday mornings
- Consider the food tour that runs on Thursdays`;
      } else {
        generatedContent = `## ${editingSection.title} Details

### Recommendations
1. **First Option** - Brief description here
   - *Key detail:* Important information
   - *Another detail:* More information

2. **Second Option** - Another description
   - *Key detail:* Important information
   - *Another detail:* More information

### Tips
- Useful tip related to this section
- Another helpful suggestion
- Final recommendation`;
      }

      setEditContent(generatedContent);

      toast({
        title: "Content Generated",
        description: "AI has created content for your section.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex justify-between items-center">
            <span>What would you do on your Trip?</span>
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
              <p>
                Add things to do as per your preference and interests. Use AI to
                generate starter content.
              </p>
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
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2 text-sm"
                      onClick={() => openEditDialog(section)}
                    >
                      Edit details
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isEditing}
        onOpenChange={(open) => !open && setIsEditing(false)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSection?.title}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <MarkdownEditor value={editContent} onChange={setEditContent} />
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
    </>
  );
}
