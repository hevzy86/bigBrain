import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Eye, Loader2, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

export default function DocumentCard({
  document,
}: {
  document: Doc<"documents">;
}) {
  const [showNoPreview, setShowNoPreview] = useState(false);

  useEffect(() => {
    // Set a 2-second timer to show "No preview available" if no description
    const timer = setTimeout(() => {
      if (!document.description) {
        setShowNoPreview(true);
      }
    }, 2000);

    // Cleanup the timer if the component unmounts or document.description changes
    return () => clearTimeout(timer);
  }, [document.description]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="hidden md:block">
          <div className="flex justify-center">
            <p>
              {!document.description && !showNoPreview ? (
                <Loader2 className="animate-spin" />
              ) : (
                document.description || "No preview available"
              )}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-center">
        <div className="flex gap-x-2">
          <Button
            asChild
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Link href={`/dashboard/documents/${document._id}`}>
              <Eye className="w-4 h-4" />
              View Document
            </Link>
          </Button>
          <DeleteButton documentId={document._id} />
        </div>
      </CardFooter>
    </Card>
  );
}
