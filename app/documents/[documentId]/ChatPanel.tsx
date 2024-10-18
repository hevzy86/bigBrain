"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
// import { createDocument } from "@/convex/documetns";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { doesNotMatch } from "assert";
import {
  Authenticated,
  Unauthenticated,
  useAction,
  useMutation,
  useQuery,
} from "convex/react";
import { v } from "convex/values";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(
    api.chats.getChatsForDocument(documentId)
  );
  const askQuestion = useAction(api.documents.askQuestion);
  return (
    <div className="w-full h-[50vh] bg-gray-800  flex flex-col justify-between gap-2  p-2 space-y-4 ">
      <div className=" overflow-y-auto space-y-4 p-4">
        <div className="bg-slate-900 p-2 rounded items-center">
          AI: Ask any question using AI about this document:
        </div>
        {chats?.map((chat) => {
          <div
            className={cn(
              {
                "bg-slate-600": chat.isHuman,
                "text-right": chat.isHuman,
              },
              "p-2 rounded"
            )}
          >
            {chat.isHuman ? "You: " : "AI: "}
            {chat.text}
          </div>;
        })}
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const text = formData.get("text") as string;
          await askQuestion({ question: text, documentId }).then(
            console.log
          );
        }}
      >
        <div className="flex gap-2">
          <Input
            required
            name="text"
          />
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}
