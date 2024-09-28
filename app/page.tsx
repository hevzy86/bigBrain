"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
// import { createDocument } from "@/convex/documetns";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function Home() {
  const getDocuments = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(
    api.documents.createDocument
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        {/* <Content /> */}
        <ModeToggle />

        <Button
          onClick={() =>
            createDocument({ title: "New Document" })
          }
        >
          Create Document
        </Button>
        {getDocuments?.map((document) => (
          <div key={document._id}>{document.title}</div>
        ))}
      </Authenticated>
    </main>
  );
}
