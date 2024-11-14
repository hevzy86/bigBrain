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

import React from "react";
// import DeleteButton from "./DeleteButton";

export default function DocumentCard({
  document,
}: {
  document: Doc<"documents">;
}) {
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
          {!document.description ? (
            <Loader2 className="animate-spin" />
          ) : (
            document.description
          )}
        </p>
      </div>
    </div>
  </CardContent>
  <CardFooter className="mt-auto flex items-center justify-center">
    <Button
      asChild
      variant="secondary"
      className="flex items-center gap-2"
    >
      <Link href={`/documents/${document._id}`}>
        <Eye className="w-4 h-4" />
        View Document
      </Link>
    </Button>

    {/* <DeleteButton /> */}
  </CardFooter>
</Card>
  );
}
