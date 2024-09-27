"use client";

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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        {/* <Content /> */}
        <button
          onClick={() =>
            createDocument({ title: "New Document" })
          }
        >
          Create Document
        </button>
        {getDocuments?.map((document) => (
          <div key={document._id}>{document.title}</div>
        ))}
      </Authenticated>
    </main>
  );
}
