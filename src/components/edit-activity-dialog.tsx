"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MarkdownEditor } from "@/components/markdown-editor";
import { Sparkles } from "lucide-react";

interface EditActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
  editName: string;
  setEditName: (name: string) => void;
  editContent: string;
  setEditContent: (content: string) => void;
  onSave: () => Promise<void>;
  onGenerateAI: () => Promise<void>;
  isGenerating: boolean;
  specialRequest?: string;
  setSpecialRequest?: (request: string) => void;
}

export const EditActivityDialog = ({
  isOpen,
  onClose,
  title,
  editName,
  setEditName,
  editContent,
  setEditContent,
  onSave,
  onGenerateAI,
  isGenerating,
  specialRequest,
  setSpecialRequest,
}: EditActivityDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title} - Edit Activity</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <input
              id="activity-name"
              className="w-full p-2 border rounded-md"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            <MarkdownEditor value={editContent} onChange={setEditContent} />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Special request for AI..."
              className="w-full sm:w-auto p-2 border rounded-md"
              value={specialRequest || ""}
              onChange={(e) => setSpecialRequest?.(e.target.value)}
              disabled={isGenerating}
            />
            <Button
              variant="outline"
              onClick={onGenerateAI}
              disabled={isGenerating}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
