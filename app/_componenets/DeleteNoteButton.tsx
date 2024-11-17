"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingButton from "./LoadingButton";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export default function DeleteNoteButton({
  noteId,
}: {
  noteId: Id<"notes">;
}) {
  const deleteNote = useMutation(api.notes.deleteNote);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  let _noteId = noteId;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>
        <Button
          className="absolute top-0 right-0 m-2"
          size="icon"
          variant={"destructive"}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your note cannot be recovered after it's been
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={async (e) => {
              e.preventDefault(); // Prevents default behavior
              setIsLoading(true); // Set loading state

              try {
                // Perform the delete mutation
                router.push("/dashboard/notes/");
                console.log(
                  `Note ${noteId} deleted successfully`
                );

                await deleteNote({ noteId });
                // Navigate after successful deletion
              } catch (err) {
                console.error("Error deleting note:", err);
                alert(
                  "Failed to delete the note. Please try again."
                );
              } finally {
                setIsLoading(false); // Reset loading state
              }
            }}
            isLoading={isLoading}
            loadingText="Deleting..."
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
