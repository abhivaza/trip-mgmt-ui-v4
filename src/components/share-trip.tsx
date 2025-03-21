"use client";

import { useState } from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/providers/api-provider";
import { useToast } from "@/hooks/use-toast";

interface ShareTripButtonProps {
  tripId: string;
  className?: string;
}

interface ShareTripDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: (email: string) => Promise<void>;
}

function ShareTripDialog({
  isOpen,
  onOpenChange,
  onShare,
}: ShareTripDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onShare(email);
      setEmail("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error sharing trip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share this trip</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to share this trip
            with.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sharing..." : "Share Trip"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ShareTrip({ tripId, className }: ShareTripButtonProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const api = useApi();
  const { toast } = useToast();

  const handleShare = async (email: string) => {
    try {
      await api.post(`/app/trip/${tripId}/share`, { email });
      toast({
        title: "Success",
        description: "Trip shared successfully!",
      });
    } catch (error) {
      console.error("Error sharing trip:", error);
      toast({
        title: "Error",
        description: "Failed to share trip. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to handle in the dialog
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className={`flex items-center gap-2 ${className}`}
        onClick={() => setIsShareDialogOpen(true)}
      >
        <Share className="w-4 h-4" />
        Share
      </Button>

      <ShareTripDialog
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
      />
    </>
  );
}
