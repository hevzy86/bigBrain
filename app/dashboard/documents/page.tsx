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
import DocumentCard from "@/app/_componenets/DocumentCard";
import CreateDocumentButton from "@/app/_componenets/CreateDocumentButton";
import Image from "next/image";

export default function Home() {
  const getDocuments = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(
    api.documents.createDocument
  );

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>

      {getDocuments && getDocuments.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/documents.svg"
            width={200}
            height={200}
            alt="A picture of a girl holding documents"
          />
          <h2 className="text-2xl">You have no documents</h2>
        </div>
      )}

      <div className="grid grid-cols-4 gap-8">
        {getDocuments?.map((document) => (
          <DocumentCard
            key={document._id}
            document={document}
          />
        ))}
      </div>
    </main>
  );
}

{
  /* {getDocuments?.map((doc) => (
  <div key={doc._id}>{doc.title}</div>
))} */
}

{
  /* <button
  onClick={() => {
    createDocument({ title: "hello world" });
  }}
>
  Click Mer{" "}
</button> */
}
