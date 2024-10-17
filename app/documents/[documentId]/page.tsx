"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
// import { createDocument } from "@/convex/documetns";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { doesNotMatch } from "assert";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  if (!document)
    return (
      <div className="">
        You don't have access to this document
      </div>
    );

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">{document?.title}</h1>
        {/* <div className="flex">
          <iframe src={{document.documentUrl}/>
          </div> */}
      </div>
      <div className="flex gap-12 ">
        <div className="bg-gray-800 p-4 rounded flex-1 ">
          {document.documentUrl && (
            <iframe src={document.documentUrl} className="h-full"
           // onLoad={(e) => adjustIframeHeight(e)}
            />
            
          )}
        </div>
        <div className="w-[300px] bg-gray-800"></div>
      </div>
    </main>
  );
}

//   const createDocument = useMutation(
//     api.documents.createDocument
//   );
// console.log(document)
