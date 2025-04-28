"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Loader2,
  Edit,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { useApi } from "@/providers/api-provider";
import type { Activity, ThingsToDo } from "@/types/itinerary";
import { EditActivityDialog } from "./edit-activity-dialog";
import { getSectionIcon } from "./get-section-icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CustomSectionsProps {
  tripId: string;
  place: string;
  thingsToDo: ThingsToDo[];
  setThingsToDo: (thingsToDo: ThingsToDo[]) => void;
}

const SECTION_TEMPLATES = [
  {
    id: "hiking",
    title: "Hiking Plan",
    activities: [
      {
        title: "Hiking Trails",
        description:
          "Add details about hiking trails, difficulty levels, and required gear.",
      },
    ],
  },
  {
    id: "dining",
    title: "Dining Plan",
    activities: [
      {
        title: "Restaurants",
        description:
          "List restaurants to visit, local cuisines to try, and reservation details.",
      },
    ],
  },
  {
    id: "trending",
    title: "Trending Reels",
    activities: [
      {
        title: "Popular Spots",
        description:
          "Popular spots for photos and videos, trending locations from social media.",
      },
    ],
  },
  {
    id: "landmarks",
    title: "Must-See Landmarks",
    activities: [
      {
        title: "Landmarks",
        description:
          "Important landmarks and attractions you don't want to miss.",
      },
    ],
  },
  {
    id: "photography",
    title: "Photography Spots",
    activities: [
      {
        title: "Photo Locations",
        description: "Best locations and times for taking memorable photos.",
      },
    ],
  },
  {
    id: "transport",
    title: "Transportation",
    activities: [
      {
        title: "Transport Options",
        description:
          "Local transportation options, rental information, and navigation tips.",
      },
    ],
  },
];

export function TripSections({
  tripId,
  place,
  thingsToDo,
  setThingsToDo,
}: CustomSectionsProps) {
  const [sections, setSections] = useState<ThingsToDo[]>([]);
  const [open, setOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ThingsToDo | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");
  const api = useApi();
  const [generatingSectionId, setGeneratingSectionId] = useState<string | null>(
    null
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const { toast } = useToast();

  useEffect(() => {
    if (thingsToDo && thingsToDo.length > 0) {
      setSections(thingsToDo);
      // Initialize all sections as expanded
      const expanded: Record<string, boolean> = {};
      thingsToDo.forEach((section) => {
        expanded[section.id] = true;
      });
      setExpandedSections(expanded);
    }
  }, [thingsToDo]);

  useEffect(() => {
    const sectionsJSON = JSON.stringify(sections);
    const thingsToDoJSON = JSON.stringify(thingsToDo);

    if (sectionsJSON !== thingsToDoJSON) {
      setThingsToDo(sections);
    }
  }, [sections, setThingsToDo, thingsToDo]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const addSection = async (template: (typeof SECTION_TEMPLATES)[0]) => {
    const newSection = {
      ...template,
      id: `${template.id}-${Date.now()}`,
    };

    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    setThingsToDo(updatedSections);
    setOpen(false);

    // Set the new section as expanded
    setExpandedSections((prev) => ({
      ...prev,
      [newSection.id]: true,
    }));

    setGeneratingSectionId(newSection.id);

    try {
      setIsGenerating(true);
      const response = await api.post<
        { activity: string; place: string },
        ThingsToDo
      >(`/app/trip/${tripId}/section/generate`, {
        activity: template.title,
        place: place,
      });

      if (response.activities && response.activities.length > 0) {
        setSections((prevSections) =>
          prevSections.map((section) => {
            if (section.id === newSection.id) {
              return {
                ...section,
                title: response.title,
                activities: response.activities.map((activity) => ({
                  title: activity.title || "Activity",
                  description: activity.description || "",
                })),
              };
            }
            return section;
          })
        );
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
      setGeneratingSectionId(null);
    }
  };

  const addCustomSection = async () => {
    if (!customSectionTitle.trim()) {
      toast({
        title: "Section Title Required",
        description: "Please enter a title for your custom section.",
        variant: "destructive",
      });
      return;
    }

    const newSection = {
      id: `custom-${Date.now()}`,
      title: customSectionTitle,
      icon: getSectionIcon(customSectionTitle),
      activities: [
        {
          title: "New Activity",
          description: "Add details for this activity.",
        },
      ],
    };

    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    setThingsToDo(updatedSections);
    setCustomSectionTitle("");
    setIsCreatingCustom(false);
    setOpen(false);

    // Set the new section as expanded
    setExpandedSections((prev) => ({
      ...prev,
      [newSection.id]: true,
    }));

    setGeneratingSectionId(newSection.id);

    try {
      setIsGenerating(true);
      const response = await api.post<
        { activity: string; place: string },
        ThingsToDo
      >(`/app/trip/${tripId}/section/generate`, {
        activity: customSectionTitle,
        place: place,
      });

      if (response.activities && response.activities.length > 0) {
        setSections((prevSections) =>
          prevSections.map((section) => {
            if (section.id === newSection.id) {
              return {
                ...section,
                title: response.title,
                activities: response.activities.map((activity) => ({
                  title: activity.title || "Activity",
                  description: activity.description || "",
                })),
              };
            }
            return section;
          })
        );
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
      setGeneratingSectionId(null);
    }
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const openEditDialog = (section: ThingsToDo, activity: Activity) => {
    setEditingSection(section);
    setEditingActivity(activity);
    setEditName(activity.title);
    setEditContent(activity.description);
    setIsEditing(true);
  };

  const saveEditedContent = async () => {
    if (!editingSection || !editingActivity) return;

    setSections(
      sections.map((section) => {
        if (section.id === editingSection.id) {
          return {
            ...section,
            activities: section.activities.map((activity) => {
              if (activity.title === editingActivity.title) {
                return {
                  title: editName,
                  description: editContent,
                };
              }
              return activity;
            }),
          };
        }
        return section;
      })
    );

    setIsEditing(false);
    setEditingSection(null);
    setEditingActivity(null);
  };

  const generateAIContent = async () => {
    if (!editingSection || !editingActivity) return;

    setIsGenerating(true);

    try {
      const response = await api.post<
        { activity: string; place: string; specialRequest: string },
        Activity
      >(`/app/trip/${tripId}/section/activity/generate`, {
        activity: editingSection.title,
        place: place,
        specialRequest: specialRequest,
      });

      if (response) {
        setEditContent(response.description || "");
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addActivity = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            activities: [
              ...section.activities,
              {
                title: `New Activity ${section.activities.length + 1}`,
                description: "Add details for this activity.",
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const removeActivity = (sectionId: string, activityName: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            activities: section.activities.filter(
              (activity) => activity.title !== activityName
            ),
          };
        }
        return section;
      })
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center mb-2 pb-2">
          <h2 className="text-lg font-semibold">
            What would you do on your Trip?
          </h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={isGenerating || generatingSectionId !== null}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add section</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Things to do</DialogTitle>
              </DialogHeader>
              {isCreatingCustom ? (
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="custom-section-title"
                      className="text-sm font-medium"
                    >
                      Section Title
                    </label>
                    <input
                      id="custom-section-title"
                      className="w-full p-2 border rounded-md"
                      value={customSectionTitle}
                      onChange={(e) => setCustomSectionTitle(e.target.value)}
                      placeholder="Enter section title..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingCustom(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addCustomSection}
                      disabled={isGenerating || generatingSectionId !== null}
                    >
                      Create Section
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {SECTION_TEMPLATES.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent"
                        onClick={() => addSection(template)}
                        disabled={isGenerating || generatingSectionId !== null}
                      >
                        {getSectionIcon(template.title)}
                        <span>{template.title}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingCustom(true)}
                      disabled={isGenerating || generatingSectionId !== null}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Section
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {sections.length === 0 ? (
          <div className="text-center text-muted-foreground p-8 border rounded-md">
            <p>
              Add things to do as per your preference and interests. Use AI to
              generate starter content.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="rounded-md">
                <Collapsible
                  open={expandedSections[section.id]}
                  onOpenChange={() => toggleSection(section.id)}
                  className="w-full"
                >
                  <div className="flex items-center gap-2 py-2 bg-muted rounded-t-md">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                        {expandedSections[section.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>

                    <div className="flex items-center gap-2 flex-1">
                      {generatingSectionId === section.id ? (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      ) : (
                        getSectionIcon(section.title)
                      )}
                      <h3 className="font-medium">{section.title}</h3>
                      {generatingSectionId === section.id && (
                        <Badge variant="outline" className="ml-2">
                          Generating...
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(section.id);
                      }}
                      disabled={generatingSectionId === section.id}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <CollapsibleContent>
                    <div className="pl-2 pr-2 py-2 space-y-3 border-l border-r border-b rounded-b-md">
                      {section.activities.map((activity, index) => (
                        <div key={index} className="pr-2 group">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">
                                  {activity.title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() =>
                                    removeActivity(section.id, activity.title)
                                  }
                                  disabled={generatingSectionId === section.id}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">
                                    Remove activity
                                  </span>
                                </Button>
                              </div>
                              <div className="text-sm prose prose-sm max-w-none mt-1 pl-0">
                                <ReactMarkdown>
                                  {activity.description}
                                </ReactMarkdown>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto mt-1 text-xs text-muted-foreground hover:text-foreground"
                                onClick={() =>
                                  openEditDialog(section, activity)
                                }
                                disabled={generatingSectionId === section.id}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                          {index < section.activities.length - 1 && (
                            <Separator className="my-3" />
                          )}
                        </div>
                      ))}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => addActivity(section.id)}
                        disabled={generatingSectionId === section.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Activity
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditActivityDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title={editingSection?.title || ""}
        editName={editName}
        setEditName={setEditName}
        editContent={editContent}
        setEditContent={setEditContent}
        onSave={async () => {
          return saveEditedContent();
        }}
        onGenerateAI={async () => {
          return generateAIContent();
        }}
        isGenerating={isGenerating}
        specialRequest={specialRequest}
        setSpecialRequest={setSpecialRequest}
      />
    </>
  );
}
