"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MarkdownEditor } from "@/components/markdown-editor"
import { Sparkles } from "lucide-react"
import type { ItineraryDayActivity } from "@/types/itinerary"

interface EditActivityDialogProps {
  isOpen: boolean
  onClose: () => void
  activity: ItineraryDayActivity | null
  editName: string
  setEditName: (name: string) => void
  editContent: string
  setEditContent: (content: string) => void
  onSave: () => Promise<void>
  onGenerateAI: () => Promise<void>
  isGenerating: boolean
}

export const EditActivityDialog = ({
  isOpen,
  onClose,
  activity,
  editName,
  setEditName,
  editContent,
  setEditContent,
  onSave,
  onGenerateAI,
  isGenerating,
}: EditActivityDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{activity?.title} - Edit Activity</DialogTitle>
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
            <label className="text-sm font-medium">Activity Description</label>
            <MarkdownEditor value={editContent} onChange={setEditContent} />
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <Button variant="outline" onClick={onGenerateAI} disabled={isGenerating} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
