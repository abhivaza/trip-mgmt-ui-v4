"use client";

import type React from "react";

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
import { Button } from "@/components/ui/button";
import { Share, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/providers/api-provider";
import { DeleteConfirmDialog } from "./delete-confirmation-dialog";

interface ShareTripDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: (email: string) => Promise<void>;
  tripId: string;
  sharedWith: string[];
}

interface ShareTripButtonProps {
  trip: {
    id: string;
    sharedWith?: string[];
  };
  className?: string;
}

interface SharedUser {
  id: string;
  email: string;
  name: string | null;
}

function ShareTripDialog({
  isOpen,
  onOpenChange,
  onShare,
  tripId,
  sharedWith,
}: ShareTripDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<SharedUser | null>(null);
  const api = useApi();
  const { toast } = useToast();

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/app/trip/${tripId}/share/${userToDelete.id}`);
      // Assuming the backend returns the updated shared users list
      toast({
        title: "Success",
        description: "User removed from shared trip.",
      });
    } catch (error) {
      console.error("Error removing user:", error);
      toast({
        title: "Error",
        description: "Failed to remove user from shared trip.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onShare(email);
      setEmail("");
    } catch (error) {
      console.error("Error sharing trip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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

              {sharedWith && sharedWith.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Shared with:</h4>
                  <ul className="space-y-2">
                    {sharedWith.map((email, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-sm p-2 bg-muted rounded-md"
                      >
                        <span className="truncate max-w-[250px]">{email}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setUserToDelete({
                              id: index.toString(),
                              email,
                              name: null,
                            });
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sharing..." : "Share Trip"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        title="Remove user from shared trip?"
        description={`Are you sure you want to remove ${
          userToDelete?.name || userToDelete?.email || "this user"
        } from this shared trip?`}
        confirmText="Remove"
      />
    </>
  );
}

export function TripToolbar({ trip, className }: ShareTripButtonProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const api = useApi();
  const { toast } = useToast();

  const handleShare = async (email: string) => {
    try {
      await api.post(`/app/trip/${trip.id}/share`, { email });
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

  const handleDeleteTrip = async () => {
    try {
      await api.delete(`/app/trip/${trip.id}`);
      toast({
        title: "Success",
        description: "Trip deleted successfully!",
      });
      // Redirect or update UI as needed after deletion
      window.location.href = "/app/trips";
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast({
        title: "Error",
        description: "Failed to delete trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className={`flex gap-2 ${className || ""}`}>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsShareDialogOpen(true)}
        >
          <Share className="w-4 h-4" />
          Share
        </Button>

        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>

      <ShareTripDialog
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
        tripId={trip.id || ""}
        sharedWith={trip.sharedWith || []}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteTrip}
        title="Delete trip?"
        description="Are you sure you want to delete this trip? This action cannot be undone."
      />
    </>
  );
}
