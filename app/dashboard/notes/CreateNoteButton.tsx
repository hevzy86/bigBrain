"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { createDocument } from "@/convex/documents";
// import { createDocument } from "@/convex/documetns";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNoteForm from "./CreateNoteForm";
import { PlusIcon, Upload } from "lucide-react";
import { ReactNode, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CreateNoteButton({
  onClick,
  children,
}: {
  children: ReactNode;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  return (
    <Dialog
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1"
          type="submit"
          onClick={(e) => {
            onClick?.(e);
          }}
        >
          <PlusIcon className="w-4 h-4" /> {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Type whatever note you want to be searchable later
            on.
          </DialogDescription>

          <CreateNoteForm
            onNoteCreated={() => {
              setIsOpen(false);
              toast({
                title: "Note Created",
                description:
                  "Yuor node has been created successfully.",
              });
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
